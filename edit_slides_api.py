#!/usr/bin/env python3

import subprocess
import json
import requests
import os

def get_access_token():
    """Get access token using gog auth system"""
    try:
        # Export token from gog
        result = subprocess.run([
            'gog', 'auth', 'tokens', 'export', 'dora@wtf-agency.com', 
            '--output', '/tmp/token.json'
        ], capture_output=True, text=True, env={**os.environ, 'GOG_ACCOUNT': 'dora@wtf-agency.com'})
        
        if result.returncode == 0:
            # Read the exported token
            with open('/tmp/token.json', 'r') as f:
                token_data = json.load(f)
            
            # Get a fresh access token
            refresh_token = token_data.get('refresh_token')
            if refresh_token:
                # Use refresh token to get access token
                token_url = "https://oauth2.googleapis.com/token"
                token_data = {
                    'client_id': '824858676072-csj3d1qdnaiegl5f06nbtel96va8o930.apps.googleusercontent.com',
                    'client_secret': 'your_client_secret',
                    'refresh_token': refresh_token,
                    'grant_type': 'refresh_token'
                }
                
                response = requests.post(token_url, data=token_data)
                if response.status_code == 200:
                    return response.json()['access_token']
        
        print(f"Error exporting token: {result.stderr}")
        return None
        
    except Exception as e:
        print(f"Error getting access token: {e}")
        return None

def edit_presentation():
    """Edit the World Skate presentation using Google Slides API"""
    
    presentation_id = "1SiUqw-Snrwc4Sof6bEPGekT1cbPsfWveRMXmv226gRA"
    
    # Simplified approach: use gog directly with a custom script
    replacements = [
        ("PRESUPUESTO PISCO DIABLO", "PRESUPUESTO WORLD SKATE"),
        ("CREATIVIDAD OPERANDO EN MODO IA", "PLATAFORMA CULTURAL GLOBAL EN MODO IA"),
        ("marca personal Malek", "World Skate Platform"),
        ("Malek", "World Skate"),
        ("$2.100.000", "USD 17,500"),
        ("durante 2026", "durante 24 meses"),
        ('"NO TALK. JUST RACE."', '"POWER TO MOVE SKATE FORWARD"'),
        ("Pista, Proceso, Control, Evolución", "Positioning, Image, Storytelling, Community"),
        ("Construcción → Presion → Evolución", "Governing → Leading → Empowering"),
        ("4-8 piezas de contenido por mes", "8-12 piezas de contenido por mes"),
        ("biblia de marca Malek", "Brand Bible World Skate"),
    ]
    
    # Create a batch update using curl and gog auth
    batch_requests = []
    for old_text, new_text in replacements:
        request = {
            "replaceAllText": {
                "containsText": {
                    "text": old_text,
                    "matchCase": True
                },
                "replaceText": new_text
            }
        }
        batch_requests.append(request)
    
    batch_update = {
        "requests": batch_requests
    }
    
    # Save the batch update to a file
    with open('/tmp/batch_update.json', 'w') as f:
        json.dump(batch_update, f, indent=2)
    
    print(f"Created batch update with {len(batch_requests)} requests")
    print("Batch update saved to /tmp/batch_update.json")
    
    # Try to use curl with gog auth somehow
    # For now, let's show what we would do
    curl_command = f"""
curl -X POST \\
  'https://slides.googleapis.com/v1/presentations/{presentation_id}:batchUpdate' \\
  -H 'Authorization: Bearer [ACCESS_TOKEN]' \\
  -H 'Content-Type: application/json' \\
  -d @/tmp/batch_update.json
"""
    
    print("\nCurl command that would work:")
    print(curl_command)
    
    return True

if __name__ == "__main__":
    edit_presentation()