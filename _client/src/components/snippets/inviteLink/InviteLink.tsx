import React from 'react';
import "./inviteButton.css";
import Button from "@material-ui/core/Button";


type InviteProps = {
    inviteLink: string
};

export const InviteLink = ({inviteLink}: InviteProps) => {

    function CopyInviteLink(): void {

        const input = document.createElement("textarea");
        document.body.appendChild(input);
        input.value = inviteLink;
        input.select();
        document.execCommand("copy");
        document.body.removeChild(input);
    }

    return (
        <Button
            variant="contained" color="primary"
                type="submit"
                id="createRoom" className="inviteButton"
                onClick={CopyInviteLink}>
            Copy Invite Link
        </Button>
    );
}

export default InviteLink;
