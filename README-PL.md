# Świąteczne losowanie — projekt Netlify

To jest kompletny projekt strony z synchronizacją między urządzeniami. Sama strona `index.html` nie wystarczy: synchronizację zapewnia funkcja Netlify `/.netlify/functions/room`, a dane są przechowywane w Netlify Blobs.

## Co znajduje się w paczce

- `index.html` — strona losowania;
- `netlify/functions/room.mjs` — API do odczytu i zapisu wspólnego pokoju;
- `netlify.toml` — konfiguracja publikacji i funkcji;
- `package.json` — zależność `@netlify/blobs`.

## Wdrożenie

1. Rozpakuj `secret-santa-netlify-project.zip`.
2. Umieść **całą zawartość folderu** `secret-santa-netlify` w repozytorium Git (np. GitHub) — zachowaj strukturę katalogów.
3. W Netlify wybierz **Add new site / Import an existing project** i połącz repozytorium.
4. Jako katalog publikacji użyj `.`. Nie ustawiaj osobnej komendy build — projekt jest statyczny, a funkcja jest wskazana w `netlify.toml`.
5. Wdróż witrynę i poczekaj, aż zakończy się deploy funkcji.

Nie wdrażaj samego pliku HTML przez zwykłe przeciągnięcie go do Netlify Drop. W takim wdrożeniu funkcja serwerowa nie będzie dostępna.

## Test po wdrożeniu

Otwórz w przeglądarce adres (podmień domenę na swoją):

`https://TWOJA-DOMENA/.netlify/functions/room?room=testroom`

- JSON z komunikatem `Room not found` i statusem HTTP 404 oznacza, że funkcja odpowiada poprawnie, ale testowy pokój jeszcze nie istnieje.
- Strona Netlify z komunikatem `Page not found` oznacza, że funkcja nie została wdrożona albo ścieżka wdrożenia jest nieprawidłowa.
- Błąd `Shared storage unavailable` oznacza problem z dostępem funkcji do Netlify Blobs lub konfiguracją witryny.

Następnie otwórz stronę losowania pod adresem Netlify. Udostępnij wszystkim uczestnikom **ten sam link**. Domyślny identyfikator pokoju to `gwiazdka2026` (w adresie widoczny jako `#gwiazdka2026`). Nie zmieniaj fragmentu po `#`, jeśli wszyscy mają widzieć to samo losowanie. Zmiany powinny pojawiać się na innych urządzeniach po automatycznym odświeżeniu, zwykle w ciągu około 3 sekund.

## Ważne

- Po każdej zmianie kodu wykonaj ponowny deploy całego projektu.
- Jeśli wcześniej działała wersja bez funkcji Netlify, zastąp ją wdrożeniem kompletnego projektu z tej paczki.
- Pokój jest wspólny dla osób znających jego link i identyfikator. To rozwiązanie nie zapewnia silnego uwierzytelniania: dane pokoju, w tym przypisania i PIN-y, są przechowywane po stronie serwera i dostęp do API nie jest chroniony indywidualnym kontem uczestnika. Nie używaj tych PIN-ów do innych usług.
- Netlify Blobs jest trwałym magazynem danych; pamięć lokalna przeglądarki służy tylko jako kopia robocza.
