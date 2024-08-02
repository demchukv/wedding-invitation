const InvitePage = ({ params }: { params: { id: string } }) => {
  const id = params.id;
  return <div>Invite Page with ID: {id}</div>;
};

export default InvitePage;
