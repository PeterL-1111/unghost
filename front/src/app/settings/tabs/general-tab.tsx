// Copyright (c) 2025 Peter Liu
// SPDX-License-Identifier: MIT

import { zodResolver } from "@hookform/resolvers/zod";
import { Settings } from "lucide-react";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Switch } from "~/components/ui/switch";
import { Textarea } from "~/components/ui/textarea";
import type { SettingsState } from "~/core/store";

import type { Tab } from "./types";

// Simplified schema to avoid deep type instantiation
const generalFormSchema = z.object({
  autoAcceptedPlan: z.boolean(),
  maxPlanIterations: z.number().min(1, "Max plan iterations must be at least 1."),
  maxStepNum: z.number().min(1, "Max step number must be at least 1."),
  maxSearchResults: z.number().min(1, "Max search results must be at least 1."),
  reportStyle: z.enum(["aggressive", "conservative", "go_nuts", "friendly"]),
  userBackground: z.string(),
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type GeneralFormData = z.infer<typeof generalFormSchema>;

export const GeneralTab: Tab = ({
  settings,
  onChange,
}: {
  settings: SettingsState;
  onChange: (changes: Partial<SettingsState>) => void;
}) => {
  const generalSettings = useMemo(() => settings.general, [settings]);
  
  const form = useForm<z.infer<typeof generalFormSchema>>({
    resolver: zodResolver(generalFormSchema),
    mode: "onChange",
    defaultValues: generalSettings,
    reValidateMode: "onBlur" as const,
  });

  const currentSettings = form.watch();
  
  useEffect(() => {
    // Simple deep equality check for settings changes
    const hasChanges = JSON.stringify(currentSettings) !== JSON.stringify(settings.general);
    if (hasChanges) {
      // Create the update with explicit typing
      const generalUpdate: SettingsState["general"] = {
        autoAcceptedPlan: currentSettings.autoAcceptedPlan,
        maxPlanIterations: currentSettings.maxPlanIterations,
        maxStepNum: currentSettings.maxStepNum,
        maxSearchResults: currentSettings.maxSearchResults,
        reportStyle: currentSettings.reportStyle,
        userBackground: currentSettings.userBackground,
      };
      onChange({ general: generalUpdate });
    }
  }, [currentSettings, onChange, settings.general]);

  return (
    <div className="flex flex-col gap-4">
      <header>
        <h1 className="text-lg font-medium">General</h1>
      </header>
      <main>
        <Form {...form}>
          <form className="space-y-8">
            <FormField
              control={form.control}
              name="userBackground"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Professional Background</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Provide a brief description of your professional background, role, and goals. This will help Unghost Agent tailor outreach messages to your unique voice and objectives."
                      {...field}
                      className="min-h-[100px]"
                    />
                  </FormControl>
                  <FormDescription>
                    This information will be used to personalize your outreach messages and make them more authentic to your professional voice.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="autoAcceptedPlan"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex items-center gap-2">
                      <Switch
                        id="autoAcceptedPlan"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                      <Label className="text-sm" htmlFor="autoAcceptedPlan">
                        Allow automatic acceptance of plans
                      </Label>
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="maxPlanIterations"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Max plan iterations</FormLabel>
                  <FormControl>
                    <Input
                      className="w-60"
                      type="number"
                      defaultValue={field.value}
                      min={1}
                      onChange={(event) =>
                        field.onChange(parseInt(event.target.value || "0"))
                      }
                    />
                  </FormControl>
                  <FormDescription>
                    Set to 1 for single-step planning. Set to 2 or more to
                    enable re-planning.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="maxStepNum"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Max steps of a research plan</FormLabel>
                  <FormControl>
                    <Input
                      className="w-60"
                      type="number"
                      defaultValue={field.value}
                      min={1}
                      onChange={(event) =>
                        field.onChange(parseInt(event.target.value || "0"))
                      }
                    />
                  </FormControl>
                  <FormDescription>
                    By default, each research plan has 3 steps.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="maxSearchResults"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Max search results</FormLabel>
                  <FormControl>
                    <Input
                      className="w-60"
                      type="number"
                      defaultValue={field.value}
                      min={1}
                      onChange={(event) =>
                        field.onChange(parseInt(event.target.value || "0"))
                      }
                    />
                  </FormControl>
                  <FormDescription>
                    By default, each search step has 3 results.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </main>
    </div>
  );
};

GeneralTab.displayName = "General";
GeneralTab.icon = Settings;
