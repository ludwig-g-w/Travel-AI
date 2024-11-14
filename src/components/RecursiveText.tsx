import { Suspense } from "react";
import { Text, View } from "react-native";

export default async function RecursiveText({
  buffer,
  isFirst = true,
}: {
  buffer: ReadableStreamReader<Uint8Array>;
  isFirst?: boolean;
}) {
  // @ts-expect-error
  const { done, value } = await buffer.read();
  if (done) return null;
  const text: PerplexityChatCompletion = JSON.parse(
    new TextDecoder().decode(value)
  );

  const Container = ({ children }: { children: React.ReactNode }) =>
    isFirst ? (
      <View
        style={{
          padding: 8,
          borderRadius: 8,
          backgroundColor: "#f0f0f0",
        }}
      >
        {children}
      </View>
    ) : (
      <>{children}</>
    );

  return (
    <Container>
      <Text>
        {text.choices[0].delta.content}
        <Suspense>
          <RecursiveText buffer={buffer} isFirst={false} />
        </Suspense>
      </Text>
    </Container>
  );
}

type PerplexityChatCompletion = {
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
