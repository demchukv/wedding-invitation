const InvitationsListItem = ({ invitation }: { invitation: any }) => {
  return (
    <div>
      <p>
        {invitation.nameOne} + {invitation.nameTwo}
      </p>
    </div>
  );
};

export default InvitationsListItem;
