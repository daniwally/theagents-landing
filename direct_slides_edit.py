#!/usr/bin/env python3

import subprocess
import json
import requests
import tempfile
import os

def edit_slides_directly():
    """Edit specific text elements in the World Skate presentation"""
    
    presentation_id = "1SiUqw-Snrwc4Sof6bEPGekT1cbPsfWveRMXmv226gRA"
    
    # Step 1: Use gog slides API to make a global replace all text
    print("Making global text replacements...")
    
    # Define all the text replacements we need
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
    
    # Create batch requests
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
    
    # Create the batch update payload
    payload = {
        "requests": batch_requests
    }
    
    # Save to temp file
    temp_file = '/tmp/slides_batch_update.json'
    with open(temp_file, 'w') as f:
        json.dump(payload, f, indent=2)
    
    print(f"Created batch update file: {temp_file}")
    print(f"Number of replacements: {len(batch_requests)}")
    
    # Try using curl with Google Cloud CLI or gog
    try:
        # Method 1: Try using gcloud auth print-access-token if available
        result = subprocess.run(['gcloud', 'auth', 'print-access-token'], 
                              capture_output=True, text=True)
        
        if result.returncode == 0:
            access_token = result.stdout.strip()
            print("Got access token from gcloud")
            return make_api_call(presentation_id, temp_file, access_token)
        else:
            print("gcloud not available, trying alternative method...")
            
    except FileNotFoundError:
        print("gcloud not found")
    
    # Method 2: Try to extract token from gog
    try:
        # Use a simpler approach - just call the API with curl
        api_url = f"https://slides.googleapis.com/v1/presentations/{presentation_id}:batchUpdate"
        
        # Create a curl command that uses gog's auth somehow
        curl_cmd = [
            'curl', '-X', 'POST',
            api_url,
            '-H', 'Content-Type: application/json',
            '-d', f'@{temp_file}'
        ]
        
        print("Trying to use authenticated curl...")
        print(" ".join(curl_cmd))
        
        # This won't work without the auth header, but shows the structure
        return False
        
    except Exception as e:
        print(f"Error: {e}")
        return False

def make_api_call(presentation_id, payload_file, access_token):
    """Make the actual API call to update the presentation"""
    
    api_url = f"https://slides.googleapis.com/v1/presentations/{presentation_id}:batchUpdate"
    
    headers = {
        'Authorization': f'Bearer {access_token}',
        'Content-Type': 'application/json'
    }
    
    with open(payload_file, 'r') as f:
        payload = json.load(f)
    
    print(f"Making API call to: {api_url}")
    response = requests.post(api_url, headers=headers, json=payload)
    
    if response.status_code == 200:
        result = response.json()
        print("✅ Successfully updated presentation!")
        print(f"API returned {len(result.get('replies', []))} replies")
        return True
    else:
        print(f"❌ API call failed: {response.status_code}")
        print(f"Response: {response.text}")
        return False

if __name__ == "__main__":
    success = edit_slides_directly()
    
    if success:
        print("\n🎉 World Skate presentation updated successfully!")
        print("Link: https://docs.google.com/presentation/d/1SiUqw-Snrwc4Sof6bEPGekT1cbPsfWveRMXmv226gRA/edit")
    else:
        print("\n❌ Automatic update failed")
        print("Payload created at: /tmp/slides_batch_update.json")
        print("You can make the API call manually or use find/replace.")