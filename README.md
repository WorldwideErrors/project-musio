# Musio
Een webapplicatie waarmee bezoekers in een club eenvoudig muziek kunnen aanvragen via een QR-code. De aanvragen komen terecht bij de DJ, die deze kan bekijken en goed- of afkeuren. Het doel van dit project is om muziek aanvragen laagdrempelig, snel en toegankelijk te maken voor iedereen met een smartphone.

## Functionaliteiten
- Muziek aanvragen via een QR-code
- Aanvragen bestaan uit artiest en titel
- DJ-overzicht met alle aanvragen per event
- Mogelijkheid om aanvragen goed of af te keuren
- Snelle en eenvoudige gebruikerservaring

## Techstack
- TypeScript ^5 – typeveiligheid en schaalbaarheid
- React 19.2.3 – componentgebaseerde UI
- Next.js 16.1.1 – routing, server-side rendering en API-routes
- Tailwind CSS ^4 – snelle en consistente styling
- React Icons ^5.5.0 – iconografie
- JSON – tijdelijke dataopslag

## Architectuur
De applicatie is opgesplitst in de volgende lagen:

**UI / Presentatie laag**
React componenten die verantwoordelijk zijn voor de gebruikersinterface.
Deze laag bevat geen businesslogica en heeft geen directe toegang tot data-opslag.

**Applicatie / API laag**
Next.js API-routes die fungeren als ingang voor de applicatie.
Deze laag verbindt de UI met de onderliggende use cases.

**Domein laag**
Bevat de kern van de applicatie, zoals Event, Request en Song.
Deze laag is onafhankelijk van frameworks en infrastructuur.

**Data / Infrastructuur laag**
Verantwoordelijk voor het ophalen en opslaan van data (in dit geval via JSON-bestanden).

## SOLID-principes
De Clean Architecture in dit project is gebaseerd op de SOLID-principes:

**Single Responsibility Principle (SRP)**
Elke module heeft één duidelijke verantwoordelijkheid (UI, domain, data).

**Open/Closed Principle (OCP)**
De architectuur is voorbereid op uitbreiding, bijvoorbeeld het vervangen van JSON-opslag door een database.

**Interface Segregation Principle (ISP)**
Interfaces en modellen zijn klein en specifiek.

**Dependency Inversion Principle (DIP)**
De businesslogica is losgekoppeld van concrete implementaties zoals file system access.

## Projectstructuur
```
app/
 ├─ api/
 │   └─ events/
 │       └─ route.ts
 │   └─ events/[id]/requests
 │       └─ route.ts
 │   └─ request/
 │       └─ route.ts
 ├─ pages / components
shared/
 ├─ data/
 │   └─ events.json
 ├─ repositories
 │   └─ events-repository.ts
 │   └─ requests-repository.ts
 └─ domain/
     ├─ event.ts
     ├─ request.ts
     └─ song.ts
```

## Bekende beperkingen & verbeterpunten
Data wordt momenteel opgeslagen in JSON-bestanden
-  In een volgende iteratie kan dit eenvoudig worden vervangen door een database (bijv. Prisma, Supabase).
- Authenticatie en autorisatie voor DJ’s zijn nog niet geïmplementeerd.
- Tests zijn beperkt aanwezig.

Deze keuzes zijn bewust gemaakt vanwege de beschikbare tijd, met focus op frontend en architectuur.

## Doel van het project
Het hoofddoel van dit project was niet alleen het bouwen van een werkende applicatie, maar vooral het aantonen van mijn vermogen om:
- een duidelijke software-architectuur op te zetten
- verantwoordelijkheden te scheiden
- schaalbare en onderhoudbare code te schrijven
- Clean Architecture en SOLID-principes praktisch toe te passen binnen een Next.js-project

## Installatie
```
git clone https://github.com/WorldwideErrors/project-musio
cd musio

npm install

npm run dev
```

x Jeffrey
