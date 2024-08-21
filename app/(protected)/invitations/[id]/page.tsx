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

import { useEffect, useState, useTransition, useRef } from "react";
import { getUserInvitationById } from "@/data/user-invitations";
import { InvitationType } from "@/types/invitation";
import { BeatLoader } from "react-spinners";
import {
  EditInvitation,
  EditRef,
} from "@/app/(protected)/_components/invitation/edit-invitation";

import { useDispatch, useSelector } from "react-redux";
import { selectInvitation, setInvitation } from "@/store/invite/inviteSlice";

const InvitePage = ({ params }: { params: { id: string } }) => {
  const dispatch = useDispatch();

  const [isPending, startTransition] = useTransition();

  const data = useSelector(selectInvitation);

  const [tab, setTab] = useState("account");
  const id = params.id;
  const editRef = useRef<EditRef>(null);

  const onTabSwitch = (value: string) => {
    if (tab === "account" && value !== "account") {
      editRef?.current?.onTabChangeSaveData();
    }
    setTab(value);
  };

  useEffect(() => {
    const getInvitation = (id: string) => {
      startTransition(() => {
        getUserInvitationById(id).then(res => {
          dispatch(setInvitation(res as InvitationType));
        });
      });
    };
    getInvitation(id);
  }, [id, dispatch]);

  return (
    <>
      {!isPending && !data ? (
        <div>Invitation not found</div>
      ) : (
        <Tabs
          defaultValue="account"
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
                {isPending && <BeatLoader />}
                {!isPending && data && <EditInvitation ref={editRef} />}
              </CardContent>
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
