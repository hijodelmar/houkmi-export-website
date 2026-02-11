import { RecaptchaEnterpriseServiceClient } from '@google-cloud/recaptcha-enterprise';

/**
 * Crea una evaluación para analizar el riesgo de una acción de la IU.
 */
export async function createAssessment({
    projectID = "houkmiexport",
    recaptchaKey = "6LcI7GcsAAAAABfEZ115oceso-A9xqoX_Gueg5er",
    token,
    recaptchaAction,
}: {
    projectID?: string;
    recaptchaKey?: string;
    token: string;
    recaptchaAction: string;
}) {
    // CLAVE API de Houkmi Export
    const apiKey = "AIzaSyCiZDzFjtGcUD-jEQF3rrXtrUu_cogXx08";

    // Crea el cliente de reCAPTCHA usando la API Key proporcionada
    const client = new RecaptchaEnterpriseServiceClient({
        apiKey: apiKey,
    });

    const projectPath = client.projectPath(projectID);

    // Crea la solicitud de evaluación.
    const request = {
        assessment: {
            event: {
                token: token,
                siteKey: recaptchaKey,
                expectedAction: recaptchaAction,
            },
        },
        parent: projectPath,
    };

    try {
        const [response] = await client.createAssessment(request);

        // Verifica si el token es válido.
        if (!response.tokenProperties?.valid) {
            console.log(`The CreateAssessment call failed because the token was: ${response.tokenProperties?.invalidReason}`);
            return null;
        }

        // Verifica si se ejecutó la acción esperada.
        if (response.tokenProperties.action === recaptchaAction) {
            console.log(`The reCAPTCHA score is: ${response.riskAnalysis?.score}`);

            // Devolvemos el score (0.0 a 1.0)
            return response.riskAnalysis?.score ?? 0;
        } else {
            console.log("The action attribute in your reCAPTCHA tag does not match the action you are expecting to score");
            return null;
        }
    } catch (error) {
        console.error("Error calling reCAPTCHA Enterprise API:", error);
        return null;
    }
}
