"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { useEffect, useState, useTransition } from "react";
import { getUserInvitationById } from "@/data/user-invitations";
import { InvitationType } from "@/types/invitation";
import { BeatLoader } from "react-spinners";
import dynamic from "next/dynamic";

// import { EditInvitation } from "@/app/(protected)/_components/invitation/edit-invitation";

const EditInvitation = dynamic(() =>
  import("@/app/(protected)/_components/invitation/edit-invitation").then(
    mod => mod.EditInvitation
  )
);

const InvitePage = ({ params }: { params: { id: string } }) => {
  const [isPending, startTransition] = useTransition();
  const [data, setData] = useState<InvitationType | null>();
  const [tab, setTab] = useState("account");
  const [save, setSave] = useState(false);
  const id = params.id;

  const onTabSwitch = (value: string) => {
    if (tab === "account" && value !== "account") {
      setSave(true);
    } else {
      setSave(false);
    }
    setTab(value);
  };
  const getInvitation = async (id: string) => {
    startTransition(() => {
      getUserInvitationById(id).then(res => {
        setData(res);
      });
    });
  };

  useEffect(() => {
    getInvitation(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <>
      {isPending && <BeatLoader />}
      {!isPending && !data && <div>Invitation not found</div>}
      {!isPending && data && (
        <Tabs
          defaultValue="account"
          className="w-[600px]"
          onValueChange={(value: string) => {
            onTabSwitch(value);
          }}
        >
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="account">Edit</TabsTrigger>
            <TabsTrigger value="guests">Guests</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="statisctic">Statistics</TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <Card>
              <CardHeader>
                <CardTitle>Edit</CardTitle>
                <CardDescription>Edit your invitation</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <EditInvitation data={data} save={save} />
              </CardContent>
              {/* <CardFooter>
                <Button>Save changes</Button>
              </CardFooter> */}
            </Card>
          </TabsContent>
          <TabsContent value="guests">
            <Card>
              <CardHeader>
                <CardTitle>Guests</CardTitle>
                <CardDescription>Tabs for edit guests</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">Form</div>
              </CardContent>
              <CardFooter>
                <Button>Save password</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="preview">
            <Card>
              <CardHeader>
                <CardTitle>Preview</CardTitle>
                <CardDescription>Tabs for preview invitation</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  Edit form for invitations with ID: {id}
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="statisctic">
            <Card>
              <CardHeader>
                <CardTitle>Statistics</CardTitle>
                <CardDescription>
                  Tabs for statistics invitation
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">Invitation with ID: {id}</div>
              </CardContent>
              <CardFooter>
                <Button>Save changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </>
  );
};

export default InvitePage;
