import {
    getFormMetadata as getMetadata,
    getFormResponses as getResponses,
    processedFormdata as processResponses,
    processedMetadata as processMetadata
   } from './form.js';

// RADIO
// DROPDOWN
// CHECKBOX

export const radioParser = async () => {
    const formId = '1COaD0aW1PwPEj2tW4QtQ_IRY3JPK0kc5BulEK8GjADk';
    const metadata = processMetadata(await getMetadata(formId));
    const responses = processResponses(await getResponses(formId));

    console.log('metadata: ', metadata);
    console.log('responses: ', responses);
    return (<></>);
}