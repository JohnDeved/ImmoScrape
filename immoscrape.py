from camoufox.sync_api import Camoufox

with Camoufox(headless=True) as browser:
    page = browser.new_page()
    page.goto("https://www.immobilienscout24.de")
    
    def page_fetch(url: str):
        return page.evaluate(f"""
            fetch('{url}', {{
                headers: {{
                    'Accept': 'application/json'
                }}
            }}).then(response => response.json())
        """)
    
    result = page_fetch("https://www.immobilienscout24.de/Suche/radius/wohnung-mit-einbaukueche-mieten?centerofsearchaddress=Anhalt-Bitterfeld%20(Kreis);;;;;K%C3%B6then%20(Anhalt);&numberofrooms=2.0-&price=-700.0&pricetype=calculatedtotalrent&geocoordinates=51.75572;11.97482;30.0&sorting=7")
    
    print(result)