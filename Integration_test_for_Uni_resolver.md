# Validate Universal Resolver

## Local Universal Resolver

 Start the Universal Resolver by following the guide given [here](https://github.com/decentralized-identity/universal-resolver/blob/master/README.md).

Then
                
    git clone https://github.com/danubetech/did-core-registries
    
Then in the file scripts/build-resolver-cache.js modify the line 37 to as follows

    curl -s --max-time 10 https://localhost:8080/1.0/identifiers/${did} | jq ".didDocument" > ./test-dids/${did}.json; 
    
Then 
        
    npm install 
    npm run build-resolver-cache
    npm test

**Note:** `npm run build-resolver-cache` downloads DID Documents which are later validated. This command is not needed for every test run, only if the test samples should be updated.

## Public Universal Resolver on uniresolver.io

* Go to the git Action Flow of [DID-Core-Registry](https://github.com/danubetech/did-core-registries/actions/runs/66531901).
* Select "Run Schemas" from "Tests"([here](https://github.com/danubetech/did-core-registries/runs/545526765?check_suite_focus=true)).
* Then Click "Re-run Job" button.

### Output of this Tests

This project validates the following aspects of DID-Documents:

    1. Public Keys Validation: 
        - EcdsaSecp256k1VerificationKey2019
        - Ed25519VerificationKey2018
    2. DID Document Spec Validation:        
        - Checking Document ID and validates that it is a String
        - Document consists of valid Pattern        
        - Document needs to be an Object
    3.  json-ld Validation
    4.  json-schema Validation 

## Adding a DID Method for testing

Visit file `tests/universal-resolver-config.json` and update the DID methods that should be tested. Note, that this file is copy from the `config.json` file from the universal-resolver project, so copy/paste of the full config will work fine.