from camoufox.sync_api import Camoufox

with Camoufox(humanize=True, window=(1283, 951)) as browser:
    page = browser.new_page()
    page.goto("https://www.immobilienscout24.de")
    
    page.get_by_role('button', name='Alle Akzeptieren').click()
    textbox = page.get_by_role('textbox', name='Ort, Stadt, Adresse, PLZ,')
    textbox.click()
    textbox.type('Dessau-Roßlau', delay=50)
    page.get_by_role('button', name='Suchen').click(click_count=2, delay=250)
    page.wait_for_load_state('domcontentloaded')
    
    result = page.evaluate("""
        fetch('https://www.immobilienscout24.de/Suche/radius/wohnung-mit-einbaukueche-mieten?centerofsearchaddress=Anhalt-Bitterfeld%20(Kreis);;;;;K%C3%B6then%20(Anhalt);&numberofrooms=2.0-&price=-700.0&pricetype=calculatedtotalrent&geocoordinates=51.75572;11.97482;30.0&sorting=7', {
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => response.json())
    """)
    
    print(result)