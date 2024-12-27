import re
from camoufox.sync_api import Camoufox
import sys

headless_mode = "virtual" if sys.platform == "linux" else False

with Camoufox(headless=headless_mode, humanize=True) as browser:
    page = browser.new_page()
    page.goto("https://www.immobilienscout24.de")
    print('Opened immobilienscout24.de')
    
    page.get_by_role('button', name='Alle Akzeptieren').click()
    print('Accepted cookies')
    
    textbox = page.get_by_role('textbox', name='Ort, Stadt, Adresse, PLZ,')
    textbox.click()
    print('Clicked on search bar')
    
    textbox.type('Dessau-Roßlau', delay=50) 
    print('Typed in search bar')
    
    page.get_by_role('button', name='Suchen').click(click_count=2, delay=250)
    print('Clicked on search button')
    
    page.wait_for_url(re.compile(r'https://www\.immobilienscout24\.de/Suche/.*'))
    print('Waited for search results')
    
    
    
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