#!/usr/bin/env bash
# Builds host 2 around the two files in this folder, using Microsoft's own
# Blazor template. Needs the .NET 9 SDK; a newer SDK works too, the app
# still targets net9.0. Run on the trainer's machine:
#
#   bash hosts/second/setup.sh
#   cd hosts/second/app && dotnet run
#
# Safe to run again: the app is created once, and the gauge files are
# copied in fresh every time.
#
# Participants never run this. Host 2 is only ever on your screen.
set -euo pipefail
cd "$(dirname "$0")"

if ! command -v dotnet >/dev/null 2>&1; then
  echo "dotnet not found. Install the .NET 9 SDK from https://dotnet.microsoft.com/download/dotnet/9.0" >&2
  echo "If it is installed but not on PATH:  export PATH=\"\$HOME/.dotnet:\$PATH\"" >&2
  exit 1
fi

if [ -d app ]; then
  echo "hosts/second/app already exists: refreshing the gauge files only."
else
  dotnet new blazor -o app --interactivity Server --empty --framework net9.0
fi

cp Components/Pages/Gauge.razor app/Components/Pages/Gauge.razor
cp Components/Pages/Gauge.razor.css app/Components/Pages/Gauge.razor.css
mkdir -p app/wwwroot/js
cp wwwroot/js/gauge.js app/wwwroot/js/gauge.js

# The home page links to the gauge, so there is somewhere to navigate away to.
cat > app/Components/Pages/Home.razor <<'RAZOR'
@page "/"

<h3>Host 2</h3>
<p><a href="gauge">Gauge page</a></p>
RAZOR

echo
echo "Host 2 is ready:  cd hosts/second/app && dotnet run"
echo "After changing modules/gauge-module.js, run: npm run sync:module"
echo "It updates app/wwwroot/js/gauge.js as well."
