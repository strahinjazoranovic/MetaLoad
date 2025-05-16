## 1. MetaLoad Installeren

1. Ga naar de GitHub repo en installeer https://github.com/strahinjazoranovic/MetaLoad,

2. Vervolgens ga je naar je downloads en rechterklik je op het bestand die je hebt gedownload. Je kiest dan vervolgens "Extract All.." . Als het goed is heb je nu een normale bestand dat niet gezipt is.

3. Dit niet gezipte bestand moet je vervolgens plaatsen in je desktop folder zodat je het dan later in je terminal kunt runnen

## 2. Database Installatie  

1. [Download hier eerst XAMPP](https://www.apachefriends.org/download.html)****

2. Open XAMPP Control panel, Start Apache en MySQL. KLik op Admin bij MySQL en dit brengt je naar phpMyAdmin
   
3. Vervolgens ga je naar importeren. Je klikt op "choose file" en kopieer de lijn hieronder en zet deze in je path
   
```bash
Desktop\MetaLoad-main\MetaLoad-main\src\app\query
```
3. En dan klik je op database.sql, hierdoor krijg je alle gegevens en tables die al staan in de database.

## 3. Website runnen

1. Het kan zo zijn dat je 2 keer de map moet openen om erin te komen vanwege het extracten(voor mij is het wel zo)

2. NPM = Node Package Manager, Dit heb je nodig om mijn project op te starten. [Download hier Node.js en NPM](https://nodejs.org)

3. Kopieer de regels hieronder in volgorde en voor deze stuk voor stuk uit in je terminal, Als je de gedownloade files op een andere plaats hebt extract zorg er dan voor dat je inplaats van cd Desktop uitvoert, cd (map van installatie)

```bash
cd Desktop
cd MetaLoad-main 
cd Metaload-main 
npm install
npm run dev
```

4. Als je alles goed hebt uitgevoerd in de terminal, zie je als het goed is deze link http://localhost:3000
als je dan klikt terwijl je CTRL ingedrukt houd op je toetsenbord kan je het project openen met je browser
