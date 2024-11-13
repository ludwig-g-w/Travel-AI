import { Suspense } from "react";
import { Text } from "react-native";

export default async function RecursiveText({
  buffer,
}: {
  buffer: ReadableStreamReader<Uint8Array>;
}) {
  // @ts-expect-error
  const { done, value } = await buffer.read();
  if (done) return null;
  const text: ChatCompletion = JSON.parse(new TextDecoder().decode(value));

  return (
    <Text>
      {text.choices[0].delta.content}
      <Suspense>
        <RecursiveText buffer={buffer} />
      </Suspense>
    </Text>
  );
}

type ChatCompletion = {
  id: string;
  model: string;
  created: number;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
  citations: string[];
  object: string;
  choices: {
    index: number;
    finish_reason: string;
    message: {
      role: string;
      content: string;
    };
    delta: {
      role: string;
      content: string;
    };
  }[];
};
