## 1. MetaLoad Installeren

1. Ik werk in 2 branches. test is atijd op laaste versie maar kan incompleet zijn en bugs hebben, main is altijd compleet en wordt later pas geüpdate als alles goed getest is

2. Ga naar de GitHub repo en installeer https://github.com/strahinjazoranovic/MetaLoad, Klik op Code en klik dan op Download ZIP

3. Vervolgens ga je naar je downloads en rechterklik je op het bestand die je hebt gedownload. Je kiest dan vervolgens "Extract All.." . Als het goed is heb je nu een normale bestand dat niet gezipt is.

4. Dit niet gezipte bestand moet je vervolgens plaatsen in je desktop folder zodat je het dan later in je terminal kunt runnen

## 2. Database Installatie  

1. [Download hier eerst XAMPP](https://www.apachefriends.org/download.html)****

2. Open XAMPP Control panel, Start Apache en MySQL. KLik op Admin bij MySQL en dit brengt je naar phpMyAdmin
   
3. Vervolgens ga je naar importeren. Je klikt op "choose file" en kopieer de lijn hieronder en zet deze in je path

```bash
Desktop\MetaLoad-test\MetaLoad-test\src\app\query
```
4. En dan klik je op database.sql, scroll vervolgens naar beneden en klik op Import. Als je dit hebt uitgevoerd krijg je alle gegevens en tables die al staan in de database.

## 3. Website runnen

1. Het kan zo zijn dat je 2 keer de map moet openen om erin te komen vanwege het extracten(voor mij is het wel zo)

2. NPM = Node Package Manager, Dit heb je nodig om mijn project op te starten. [Download hier Node.js en NPM](https://nodejs.org)

3. In de .env moet jij je eigen database_port en database_username invoeren. als je dit niet doet dan werkt de database niet.

4. Kopieer de regels hieronder in volgorde en voor deze stuk voor stuk uit in je terminal, Als je de gedownloade files op een andere plaats hebt extract zorg er dan voor dat je inplaats van cd Desktop uitvoert, cd (map van installatie)

```bash
cd Desktop
cd MetaLoad-test
cd Metaload-test
npm install
npm run dev
```
5. Als je alles goed hebt uitgevoerd in de terminal, zie je als het goed is deze link http://localhost:3000
als je dan klikt terwijl je CTRL ingedrukt houd op je toetsenbord kan je het project openen met je browser
