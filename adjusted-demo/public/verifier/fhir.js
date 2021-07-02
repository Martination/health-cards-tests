const secExtractFhirBundle = (() => {

    const sec = new Section('extractFhirBundle', "Extract FHIR Bundle");
    sec.setDocs(verifierDocs.extractFhirBundle.l, verifierDocs.extractFhirBundle.r);
    sec.addTextField("FHIR Bundle");


    sec.process = async function () {

        const jwsPayloadText = secDecodeJWS.getValue(1 /*payload*/);
        if (!jwsPayloadText) return;

        const jwsPayload = tryParse(jwsPayloadText);
        if (!jwsPayload) return;

        const fhirBundle = jwsPayload?.vc?.credentialSubject?.fhirBundle;
        if (!fhirBundle) return;

        await sec.setValue(JSON.stringify(fhirBundle, null, 2));

        sec.valid() ? sec.goNext() : sec.next?.clear();

        // console.log(fhirBundle)
        // document.getElementById('fhirDataExtract').innerHTML = JSON.stringify(fhirBundle, null, 2);
        document.getElementById('fhirDataExtract').value = fhirBundle;
        window.validateCode('fhirDataExtract');


    };

    sec.validate = async function (field) {
        const profile = document.getElementById('profile-select').value;
        this.setErrors(await validate.fhirBundle(field.value, profile));
    }

    return sec;

})();
