#!/usr/bin/env python3

import subprocess
import json
import requests
import tempfile
import os

def make_slides_edits():
    """Edit the World Skate presentation using direct API calls"""
    
    presentation_id = "1SiUqw-Snrwc4Sof6bEPGekT1cbPsfWveRMXmv226gRA"
    
    # Define the text replacements
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
        ("press kit de proyección internacional", "press kit internacional para 130 federaciones")
    ]
    
    # Create batch update requests
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
    
    # Create the complete batch update payload
    batch_update = {
        "requests": batch_requests
    }
    
    # Save to temporary file
    with tempfile.NamedTemporaryFile(mode='w', suffix='.json', delete=False) as f:
        json.dump(batch_update, f, indent=2)
        batch_file = f.name
    
    print(f"Created batch update with {len(batch_requests)} text replacements")
    
    # Use curl with a token we get from gog
    try:
        # Try to get a token using gog auth export
        token_file = tempfile.NamedTemporaryFile(mode='w', suffix='.json', delete=False)
        token_file.close()
        
        # Export token
        result = subprocess.run([
            'gog', 'auth', 'tokens', 'export', 'dora@wtf-agency.com', 
            '--output', token_file.name
        ], capture_output=True, text=True, env={**os.environ, 'GOG_ACCOUNT': 'dora@wtf-agency.com'})
        
        if result.returncode == 0:
            # Read token data
            with open(token_file.name, 'r') as f:
                token_data = json.load(f)
            
            # Get access token using the refresh token
            refresh_token = token_data.get('refresh_token')
            if refresh_token:
                print("Got refresh token, generating access token...")
                
                # Use the refresh token to get an access token
                token_response = requests.post('https://oauth2.googleapis.com/token', data={
                    'client_id': '824858676072-csj3d1qdnaiegl5f06nbtel96va8o930.apps.googleusercontent.com',
                    'refresh_token': refresh_token,
                    'grant_type': 'refresh_token'
                })
                
                if token_response.status_code == 200:
                    access_token = token_response.json()['access_token']
                    print("Got access token!")
                    
                    # Now make the API call
                    api_url = f"https://slides.googleapis.com/v1/presentations/{presentation_id}:batchUpdate"
                    
                    headers = {
                        'Authorization': f'Bearer {access_token}',
                        'Content-Type': 'application/json'
                    }
                    
                    print(f"Making API call to: {api_url}")
                    response = requests.post(api_url, headers=headers, json=batch_update)
                    
                    if response.status_code == 200:
                        print("✅ Successfully updated the presentation!")
                        print("🎯 All text replacements completed")
                        return True
                    else:
                        print(f"❌ API call failed: {response.status_code}")
                        print(response.text)
                        return False
                else:
                    print(f"❌ Failed to get access token: {token_response.status_code}")
                    print(token_response.text)
                    return False
            else:
                print("❌ No refresh token found")
                return False
        else:
            print(f"❌ Failed to export token: {result.stderr}")
            return False
            
    except Exception as e:
        print(f"❌ Exception occurred: {e}")
        return False
        
    finally:
        # Clean up temp files
        try:
            os.unlink(batch_file)
            os.unlink(token_file.name)
        except:
            pass

if __name__ == "__main__":
    success = make_slides_edits()
    if success:
        print("\n🎉 DONE! World Skate presentation is ready!")
        print("Link: https://docs.google.com/presentation/d/1SiUqw-Snrwc4Sof6bEPGekT1cbPsfWveRMXmv226gRA/edit")
    else:
        print("\n❌ Failed to update presentation automatically")
        print("Use manual find/replace with the text replacements listed above.")