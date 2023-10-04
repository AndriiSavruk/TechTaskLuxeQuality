describe('Test', () => {
    it('Task', async () => {
        await browser.url('https://ultimateqa.com/simple-html-elements-for-automation/');

        const nameField = await $('#et_pb_contact_name_0');
        const emailField = await $('#et_pb_contact_email_0');
        const submitButton = await $('.et_pb_contact_submit et_pb_button');

        await nameField.setValue('Peter');
        await emailField.setValue('Pen');
        await expect(submitButton).toBeClickable();
        


    })
})