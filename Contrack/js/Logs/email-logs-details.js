/**
 * Adjusts the height of the email body iframe to fit its content, preventing scrollbars.
 * Also applies some basic styling to the iframe's content.
 * @param {HTMLIFrameElement} iframe The iframe element to adjust.
 */
function adjustIframe(iframe) {
    try {
        if (!iframe || !iframe.contentWindow || !iframe.contentWindow.document) {
            return;
        }

        const iframeDoc = iframe.contentWindow.document;

        iframeDoc.body.style.backgroundColor = '#FFFFFF';
        iframeDoc.body.style.margin = '0';
        iframeDoc.body.style.padding = '1.5rem';

        setTimeout(() => {
            const bodyHeight = iframeDoc.body.scrollHeight;
            const docElHeight = iframeDoc.documentElement.scrollHeight;
            const newHeight = Math.max(bodyHeight, docElHeight);

            iframe.style.height = (newHeight + 10) + 'px';
        }, 150);

    } catch (e) {
        console.error("Could not access or resize iframe content. Check the 'sandbox' attribute. Error:", e);
        iframe.style.height = '800px';
    }
}

window.addEventListener('resize', function () {
    const iframe = document.getElementById('email-body-iframe');
    if (iframe) {
        adjustIframe(iframe);
    }
});