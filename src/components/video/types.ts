export type EmojiReaction = {
  emoji: string;
};

export type CommentReaction = {
  comment: string;
};

type BaseReaction = {
  id: string;
  time: number;
};

export type Reaction = BaseReaction & (EmojiReaction | CommentReaction);

export function isEmojiReaction(reaction: any): reaction is EmojiReaction {
  return reaction.emoji !== undefined;
}

export function isCommentReaction(reaction: any): reaction is CommentReaction {
  return reaction.comment !== undefined;
}
