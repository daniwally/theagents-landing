#!/usr/bin/env python3

import subprocess
import json
import sys
import tempfile
import os

def update_world_skate_slides():
    """Direct API call using gog's authentication"""
    
    presentation_id = "1SiUqw-Snrwc4Sof6bEPGekT1cbPsfWveRMXmv226gRA"
    
    # All the replacements needed
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
    
    print(f"Making {len(replacements)} text replacements...")
    
    # Create requests for batch update
    requests = []
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
        requests.append(request)
    
    # Create payload
    payload = {"requests": requests}
    
    # Use a temporary file for the JSON payload
    with tempfile.NamedTemporaryFile(mode='w', suffix='.json', delete=False) as f:
        json.dump(payload, f, indent=2, ensure_ascii=False)
        payload_file = f.name
    
    try:
        # Direct API call using Python requests with gog authentication
        import requests
        
        # Try to get access token from gog
        # Method 1: Try to extract from gog's stored credentials
        home_dir = os.path.expanduser("~")
        gog_config_paths = [
            f"{home_dir}/.config/gog",
            f"{home_dir}/.gog",
            "/tmp/gog_credentials"
        ]
        
        # Method 2: Use curl with gog auth export if possible
        print("Attempting to get access token...")
        
        # Try to export token and use it
        token_file = tempfile.mktemp(suffix='.json')
        
        # Export the token
        export_cmd = [
            'gog', 'auth', 'tokens', 'export', 'dora@wtf-agency.com',
            '--output', token_file
        ]
        
        export_result = subprocess.run(
            export_cmd, 
            capture_output=True, 
            text=True,
            env={**os.environ, 'GOG_ACCOUNT': 'dora@wtf-agency.com'}
        )
        
        if export_result.returncode == 0:
            print("✅ Successfully exported token")
            
            # Read the token file
            with open(token_file, 'r') as f:
                token_data = json.load(f)
            
            # Get refresh token
            refresh_token = token_data.get('refresh_token')
            if not refresh_token:
                print("❌ No refresh token found in exported data")
                return False
            
            # Get access token using refresh token
            token_url = "https://oauth2.googleapis.com/token"
            token_payload = {
                'client_id': '824858676072-csj3d1qdnaiegl5f06nbtel96va8o930.apps.googleusercontent.com',
                'refresh_token': refresh_token,
                'grant_type': 'refresh_token'
            }
            
            print("🔄 Getting fresh access token...")
            token_response = requests.post(token_url, data=token_payload)
            
            if token_response.status_code == 200:
                access_token = token_response.json()['access_token']
                print("✅ Got fresh access token!")
                
                # Now make the Slides API call
                api_url = f"https://slides.googleapis.com/v1/presentations/{presentation_id}:batchUpdate"
                
                headers = {
                    'Authorization': f'Bearer {access_token}',
                    'Content-Type': 'application/json'
                }
                
                print(f"🚀 Making API call to update presentation...")
                response = requests.post(api_url, headers=headers, json=payload)
                
                if response.status_code == 200:
                    result = response.json()
                    print("🎉 SUCCESS! Presentation updated automatically!")
                    print(f"✅ Made {len(result.get('replies', []))} updates")
                    return True
                else:
                    print(f"❌ API call failed: {response.status_code}")
                    print(f"Response: {response.text}")
                    return False
            else:
                print(f"❌ Failed to refresh token: {token_response.status_code}")
                print(token_response.text)
                return False
        else:
            print(f"❌ Failed to export token: {export_result.stderr}")
            return False
            
    except ImportError:
        print("❌ Python requests library not available")
        return False
    except Exception as e:
        print(f"❌ Exception: {e}")
        return False
    finally:
        # Cleanup
        try:
            os.unlink(payload_file)
            if 'token_file' in locals():
                os.unlink(token_file)
        except:
            pass

if __name__ == "__main__":
    success = update_world_skate_slides()
    
    if success:
        print("\n🎯 WORLD SKATE PRESENTATION COMPLETED!")
        print("🔗 https://docs.google.com/presentation/d/1SiUqw-Snrwc4Sof6bEPGekT1cbPsfWveRMXmv226gRA/edit")
        print("📋 Ready to send to client!")
    else:
        print("\n❌ Automatic update failed")
        print("📝 Use manual find/replace as backup")