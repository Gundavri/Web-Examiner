(function (window) {
    //  Change this string to public ip
    const PUBLIC_IP = '---------';
    //----------------------------
    window.bootstrapSettings = {
        production: true,
        API_URL: `http://${PUBLIC_IP}:8000/api`,
        IMAGE_BASE_URL: `http://${PUBLIC_IP}:8000/image/`
    };
    window.adminBootstrapSettings = {
        production: true,
        API_URL: `http://${PUBLIC_IP}:8000/api/admin`,
        IMAGE_BASE_URL: `http://${PUBLIC_IP}:8000/image/`
    };
}(this));
