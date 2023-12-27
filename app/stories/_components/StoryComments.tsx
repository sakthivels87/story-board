"use client";
import { Box, Button, Flex, TextArea } from "@radix-ui/themes";
import "easymde/dist/easymde.min.css";
import dynamic from "next/dynamic";
import SimpleMDE from "easymde";
import React, { useMemo, useState } from "react";
import { SimpleMdeToCodemirrorEvents } from "react-simplemde-editor";
import StoryCommentBox from "./StoryCommentBox";
import { useSession } from "next-auth/react";
import Skeleton from "react-loading-skeleton";
const SimpleMde = dynamic(() => import("react-simplemde-editor"));

const StoryComments = () => {
  const [toggleEditor, setToggleEditor] = useState(false);
  const [comment, setComment] = useState("Add your comments...");
  const { status, data: session } = useSession();
  const onChange = (value: string) => {
    setComment(value);
  };

  const events = useMemo(() => {
    return {
      focus: () => console.log("focused..."),
    } as SimpleMdeToCodemirrorEvents;
  }, []);

  const autofocusNoSpellcheckerOptions = useMemo(() => {
    return {
      autofocus: true,
      spellChecker: false,
    } as SimpleMDE.Options;
  }, []);

  return (
    <div>
      {!toggleEditor && (
        <Box my="5">
          <label htmlFor="story-comments">Comments:</label>
          <TextArea
            onFocus={() => {
              setToggleEditor(!toggleEditor);
            }}
            placeholder="Add your comments"
          />
        </Box>
      )}
      {toggleEditor && (
        <Box>
          <SimpleMde
            events={events}
            onChange={onChange}
            value={comment}
            data-testid="autofocus-no-spellchecker-editor"
            options={autofocusNoSpellcheckerOptions}
          />
          <Flex gap="2" justify="end">
            <Button onClick={() => console.log("ok")} color="indigo">
              Ok
            </Button>
            <Button
              onClick={() => {
                setToggleEditor(false);
              }}
              color="orange"
            >
              Cancel
            </Button>
          </Flex>
        </Box>
      )}
      <Flex my="2" gap="3" direction="column">
        <StoryCommentBox
          name={session?.user?.name! || "Sakthivel Samuthiram"}
          imageUrl={session?.user?.image || null}
          comment="sample Text from story comments box."
        ></StoryCommentBox>
      </Flex>
    </div>
  );
};

export default StoryComments;
