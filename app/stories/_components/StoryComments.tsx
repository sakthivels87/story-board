"use client";
import { Box, Button, Flex, TextArea } from "@radix-ui/themes";
import "easymde/dist/easymde.min.css";
import dynamic from "next/dynamic";
import SimpleMDE from "easymde";
import React, { useMemo, useState } from "react";
import { SimpleMdeToCodemirrorEvents } from "react-simplemde-editor";
import StoryCommentBox from "./StoryCommentBox";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Skeleton from "react-loading-skeleton";
import { Comments } from "@prisma/client";

const SimpleMde = dynamic(() => import("react-simplemde-editor"));

const StoryComments = async ({ storyId }: { storyId: string }) => {
  const [toggleEditor, setToggleEditor] = useState(false);
  //const [comment, setComment] = useState("Add your comments...");
  let comment = "Add your comments...";
  const onChange = (value: string) => {
    comment = value;
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
            onChange={onChange}
            value={comment}
            data-testid="autofocus-no-spellchecker-editor"
            options={autofocusNoSpellcheckerOptions}
          />
          <Flex gap="2" justify="end">
            <Button
              onClick={async () => {
                const apiPath = `/api/stories/${storyId}/comments`;
                const result = await axios
                  .post(apiPath, {
                    storyId,
                    comment,
                  })
                  .catch((e) => {
                    console.log("something wrong... ", e);
                  });
                console.log("Request Submitted..", result);
              }}
              color="indigo"
            >
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
        <StoryCommentBox storyId={storyId} newComment={comment} />
      </Flex>
    </div>
  );
};
export default StoryComments;
