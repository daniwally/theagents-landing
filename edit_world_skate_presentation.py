#!/usr/bin/env python3

from google.oauth2.credentials import Credentials
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
import json
import os

# Configuration
PRESENTATION_ID = '1SiUqw-Snrwc4Sof6bEPGekT1cbPsfWveRMXmv226gRA'
SCOPES = ['https://www.googleapis.com/auth/presentations']

def get_credentials():
    """Get credentials from gog CLI token"""
    # Try to get credentials from gog
    try:
        import subprocess
        result = subprocess.run(['gog', 'auth', 'list', '--json'], 
                              capture_output=True, text=True, 
                              env={**os.environ, 'GOG_ACCOUNT': 'dora@wtf-agency.com'})
        
        if result.returncode == 0:
            auth_data = json.loads(result.stdout)
            # This is a simplified approach - in practice we'd need proper OAuth flow
            print("Auth data found, but Google Slides API requires different setup")
            return None
    except Exception as e:
        print(f"Error getting credentials: {e}")
    
    return None

def main():
    """Main function to edit the presentation"""
    
    # Text replacements for World Skate
    replacements = [
        ("PRESUPUESTO PISCO DIABLO", "PRESUPUESTO WORLD SKATE"),
        ("CREATIVIDAD OPERANDO EN MODO IA", "PLATAFORMA CULTURAL GLOBAL EN MODO IA"),
        ("Pisco Diablo", "World Skate"),
        ("marca personal Malek", "World Skate Platform"),
        ("Malek", "World Skate"),
        ("$2.100.000", "USD 17,500"),
        ("durante 2026", "durante 24 meses"),
        ("\"NO TALK. JUST RACE.\"", "\"POWER TO MOVE SKATE FORWARD\""),
        ("Pista, Proceso, Control, Evolución", "Positioning, Image, Storytelling, Community"),
        ("Construcción → Presion → Evolución", "Governing → Leading → Empowering"),
        ("piloto prometedor a figura representativa", "organismo regulador a plataforma cultural global"),
        ("4-8 piezas de contenido por mes", "8-12 piezas de contenido por mes"),
        ("biblia de marca Malek", "Brand Bible World Skate"),
        ("press kit de proyección internacional", "press kit internacional para 130 federaciones"),
    ]
    
    print("Text replacements that need to be made:")
    for old, new in replacements:
        print(f"'{old}' → '{new}'")
    
    print(f"\nPresentation ID: {PRESENTATION_ID}")
    print("Link: https://docs.google.com/presentation/d/1SiUqw-Snrwc4Sof6bEPGekT1cbPsfWveRMXmv226gRA/edit")
    
    print("\nNote: Google Slides API requires proper OAuth setup.")
    print("For now, these replacements need to be done manually or via browser automation.")

if __name__ == '__main__':
    main()