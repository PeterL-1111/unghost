graph TD;
    subgraph "Input";
        A["Target Person (e.g., LinkedIn URL)"];
    end

    subgraph "Pillar 1: Persona Intelligence Engine (PIE)";
        B(Researcher Agent) -- "Uses" --> C{{"MCP Tools<br/>(LinkedIn, Social Media)"}};
        A --> B;
        B -- "Produces" --> D["RecipientPersonaProfile (Data)"];
    end

    subgraph "Pillar 2: Strategy Formulation";
        E(Strategizer Agent);
        D --> E;
        E -- "Produces" --> F["OutreachStrategy (Data)"];
    end

    subgraph "Pillar 3: Message Composition";
        G(Message Composer Agent);
        D & F --> G;
        G -- "Produces" --> H["Draft Message (Text)"];
    end

    subgraph "Pillar 4: Human-in-the-Loop";
        I(Human Feedback Node);
        H --> I;
        I -- "User Approves" --> J;
    end

    subgraph "Pillar 5: Reporting";
        J(Reporter Agent);
        D & F & H --> J;
        J -- "Produces Final Output" --> K["OutreachReport (Final)"];
    end

    style D fill:#f9f,stroke:#333,stroke-width:2px
    style F fill:#f9f,stroke:#333,stroke-width:2px
    style K fill:#ccf,stroke:#333,stroke-width:2px