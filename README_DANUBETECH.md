# Validate Universal Resolver

## Local Universal Resolver

 Start the Universal Resolver by following the guide given [here](https://github.com/decentralized-identity/universal-resolver/blob/master/README.md).

Then,
                
    git clone https://github.com/danubetech/did-core-registries
    
Then in the file scripts/build-resolver-cache.js modify the line 33 to as follows

    curl -s --max-time 10 https://localhost:8080/1.0/identifiers/${did} | jq ".didDocument" > ./test-dids/${did}.json; 
    
Then 
        
    npm install 
    npm run build-resolver-cache
    npm  Test
    
## validate uniresolver.io domain

* Go to the git Action Flow of [DID-Core-Registry](https://github.com/danubetech/did-core-registries/actions/runs/66531901).
* Select "Run Schemas" from "Tests"([here](https://github.com/danubetech/did-core-registries/runs/545526765?check_suite_focus=true)).
* Then Click "Re-run Job" button.

### Out Put of this Tests.

*  This project validate the following aspects of DID-Documents.

    1. Public Keys Validation : EcdsaSecp256k1VerificationKey2019 and Ed25519VerificationKey2018.
    2. DID Document Spec Validation :        
        - Looking for Document ID and need to be a String ID.
        - Document consist of valid  Pattern.        
        - Document need to be an Object.
    3.  json-ld Validation
    4.  json- Schema Validation 
