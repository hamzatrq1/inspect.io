# Architecture

## Organisation

INSPECT is composed of 3 main components: the collector, the server and the application. 
The collector is responsible for collecting data from various sources, such as logs, metrics, and traces. 
The server is responsible for processing and storing the collected data, and providing a user interface for visualizing and analyzing the data. 
The application is responsible for generating the data that is collected by the collector.


## INSPECT services


```mermaid
  flowchart TD

  classDef IHM fill:#FDE7F3,stroke:#000000,color:#1f2937, font-family: Inter;
  classDef Angular_Collector fill:#FEF3C7,stroke:#000000,color:#1f2937, font-family: Inter;
  classDef App fill:#E3B2BF,stroke:#000000,color:#1f2937, font-family: Inter;
  classDef BDD fill:#E0F2FE,stroke:#000000,color:#1f2937, font-family: Inter;
  classDef Requests fill:#F7F1E6,stroke:#000000,color:#1f2937, font-family: Inter;
  classDef Core fill:#D8EACD,stroke:#000000,color:#1f2937, font-family: Inter;
  classDef Server fill:#C5EEF1,stroke:#000000,color:#1f2937, font-family: Inter;
  classDef Team fill:#FDE7F3,stroke:#000000,color:#1f2937, font-family: Inter;


  IHM([Applications front-end\nAngular / Browser]) -->|User actions| Angular_Collector([inspect-ng-collector])
  Angular_Collector -->|Traces + events| Server([inspect-server])

  Core([Applications Java / services\ninspect-core]) -->|Sessions + requests + metrics| Server
  Server -->|Storage + indexation| BDD[(Database\nH2 / PostgreSQL)]
  Server -->|API REST| App([inspect-app])
  App -->|Dashboards + analysis| Team[Dev team / support / ops]

  Requests[Architecture + traces + requests] --> App

  click Core "architecture/collector"
  click App "architecture/application"
  click Server "architecture/server"

  class IHM IHM;
  class Angular_Collector Angular_Collector;
  class App App;
  class BDD BDD;
  class Requests Requests;
  class Core Core;
  class Server Server;
  class Team Team;
```

## Second graph

```mermaid
%%{init: {'sequence': {'mirrorActors': false}}}%%
sequenceDiagram
    participant U as User
    participant A as Angular Application
    participant NG as inspect-ng-collector
    participant C as inspect-core
    participant S as inspect-server
    participant DB as Database
    participant UI as inspect-app

    U->>A: Action in the application
    A->>NG: Browser event / interaction / HTTP
    NG->>S: Sending front traces

    A->>C: Java backend call
    C->>S: Session + request + metrics
    S->>DB: Persisting traces

    UI->>S: Analysis request
    S-->>UI: Aggregated data
    UI-->>U: Dashboard / details / architecture
```
