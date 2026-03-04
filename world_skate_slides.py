#!/usr/bin/env python3

import os
import requests
import json

def create_world_skate_presentation():
    """
    Create World Skate presentation by directly calling Google Slides API
    """
    
    # First, let's try to get credentials from the environment
    # This should work if gog auth is properly set up
    
    api_endpoint = "https://slides.googleapis.com/v1/presentations"
    presentation_id = "1SiUqw-Snrwc4Sof6bEPGekT1cbPsfWveRMXmv226gRA"
    
    # Read the existing presentation structure
    get_url = f"{api_endpoint}/{presentation_id}"
    
    print(f"Attempting to read presentation: {presentation_id}")
    print(f"URL: {get_url}")
    
    # We need to get the access token from gog
    try:
        import subprocess
        result = subprocess.run(['gog', 'auth', 'token', 'dora@wtf-agency.com'], 
                              capture_output=True, text=True)
        if result.returncode == 0:
            token = result.stdout.strip()
            print(f"Got access token: {token[:20]}...")
            
            headers = {
                'Authorization': f'Bearer {token}',
                'Content-Type': 'application/json'
            }
            
            # Get presentation data
            response = requests.get(get_url, headers=headers)
            print(f"API Response status: {response.status_code}")
            
            if response.status_code == 200:
                presentation = response.json()
                print("Successfully retrieved presentation!")
                print(f"Title: {presentation.get('title', 'No title')}")
                print(f"Slides count: {len(presentation.get('slides', []))}")
                
                # Now we can start making batch updates
                return edit_presentation_content(presentation_id, token)
            else:
                print(f"Error: {response.text}")
                return False
                
        else:
            print(f"Error getting token: {result.stderr}")
            return False
            
    except Exception as e:
        print(f"Exception: {e}")
        return False

def edit_presentation_content(presentation_id, token):
    """Make batch edits to replace Malek content with World Skate"""
    
    api_endpoint = f"https://slides.googleapis.com/v1/presentations/{presentation_id}:batchUpdate"
    
    headers = {
        'Authorization': f'Bearer {token}',
        'Content-Type': 'application/json'
    }
    
    # Define all the text replacements
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
    
    # Create batch update requests
    requests_list = []
    
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
        requests_list.append(request)
    
    batch_update_body = {
        "requests": requests_list
    }
    
    print(f"Making {len(requests_list)} text replacement requests...")
    
    # Execute the batch update
    response = requests.post(api_endpoint, headers=headers, json=batch_update_body)
    
    if response.status_code == 200:
        result = response.json()
        print("✅ Successfully updated presentation!")
        print(f"Replies count: {len(result.get('replies', []))}")
        return True
    else:
        print(f"❌ Error updating presentation: {response.status_code}")
        print(response.text)
        return False

if __name__ == "__main__":
    success = create_world_skate_presentation()
    if success:
        print("\n🎉 Presentation updated successfully!")
        print("Link: https://docs.google.com/presentation/d/1SiUqw-Snrwc4Sof6bEPGekT1cbPsfWveRMXmv226gRA/edit")
    else:
        print("\n❌ Failed to update presentation")