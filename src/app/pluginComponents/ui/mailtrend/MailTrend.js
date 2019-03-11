import React from 'react';

class MailTrend extends React.Component {
   
        state = {
            email: '', 
            subject: '',
            body:''
        };

    composemail = () => {
        let link = this.mailbody(this.state);
        link = this.url (link)
        window.location.href = link;
    } 
    
    mailbody = (linkInfo) => {
        var link = linkInfo;
        link.email = ''
        link.subject = 'New Mail'
        link.body = 'Hi, here is your first mail!'
        this.setState({ link })
        return link
    }

    url(link)
     {
        let emaillink = "mailto:"+link.email+"?subject="+link.subject+"&body="+link.body;
        return emaillink
    }


    render() {
        return (
            <div>
                <input type="submit" value="Mail me" onClick={this.composemail} />
            </div>
        );
    }
}

export default MailTrend;
