'use client';

import { MessageCircle, Send, ThumbsUp, Flag, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Comment {
    id: string;
    author: string;
    avatar: string;
    content: string;
    timestamp: string;
    likes: number;
    isOwn?: boolean;
}

interface CommentSectionProps {
    comments?: Comment[];
    onAddComment?: (content: string) => void;
    onLikeComment?: (commentId: string) => void;
    onDeleteComment?: (commentId: string) => void;
    onReportComment?: (commentId: string) => void;
}

export default function CommentSection({
    comments = [],
    onAddComment,
    onLikeComment,
    onDeleteComment,
    onReportComment
}: CommentSectionProps) {
    const [newComment, setNewComment] = useState('');
    const [likedComments, setLikedComments] = useState<Set<string>>(new Set());

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (newComment.trim() && onAddComment) {
            onAddComment(newComment);
            setNewComment('');
        }
    };

    const handleLike = (commentId: string) => {
        const newLiked = new Set(likedComments);
        if (newLiked.has(commentId)) {
            newLiked.delete(commentId);
        } else {
            newLiked.add(commentId);
        }
        setLikedComments(newLiked);
        if (onLikeComment) onLikeComment(commentId);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center gap-3">
                <MessageCircle className="w-6 h-6 text-red-600" />
                <h3 className="text-2xl font-black text-gray-900">
                    Comentários ({comments.length})
                </h3>
            </div>

            {/* Add Comment Form */}
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 shadow-sm border-2 border-gray-200">
                <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Adicione um comentário..."
                    rows={4}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-red-500 focus:outline-none resize-none"
                />
                <div className="flex justify-end mt-4">
                    <button
                        type="submit"
                        disabled={!newComment.trim()}
                        className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-pink-600 text-white font-bold py-3 px-6 rounded-xl hover:from-red-700 hover:to-pink-700 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Send className="w-4 h-4" />
                        Comentar
                    </button>
                </div>
            </form>

            {/* Comments List */}
            <div className="space-y-4">
                <AnimatePresence>
                    {comments.length === 0 ? (
                        <div className="text-center py-12 bg-gray-50 rounded-2xl">
                            <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                            <p className="text-gray-600 font-medium">Nenhum comentário ainda.</p>
                            <p className="text-gray-500 text-sm mt-2">Seja o primeiro a comentar!</p>
                        </div>
                    ) : (
                        comments.map((comment, index) => (
                            <motion.div
                                key={comment.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, x: -100 }}
                                transition={{ delay: index * 0.05 }}
                                className={`bg-white rounded-2xl p-6 shadow-sm border-2 ${
                                    comment.isOwn ? 'border-red-200 bg-red-50/30' : 'border-gray-200'
                                }`}
                            >
                                <div className="flex items-start gap-4">
                                    {/* Avatar */}
                                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-red-500 to-pink-500 rounded-full flex items-center justify-center text-white text-xl font-bold shadow-lg">
                                        {comment.avatar}
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 min-w-0">
                                        {/* Header */}
                                        <div className="flex items-center justify-between mb-2">
                                            <div>
                                                <h4 className="font-bold text-gray-900 flex items-center gap-2">
                                                    {comment.author}
                                                    {comment.isOwn && (
                                                        <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full font-bold">
                                                            Você
                                                        </span>
                                                    )}
                                                </h4>
                                                <p className="text-sm text-gray-500">{comment.timestamp}</p>
                                            </div>

                                            {/* Actions */}
                                            <div className="flex items-center gap-1">
                                                {comment.isOwn ? (
                                                    <button
                                                        onClick={() => onDeleteComment && onDeleteComment(comment.id)}
                                                        className="p-2 hover:bg-red-100 rounded-lg transition-colors text-red-600"
                                                        title="Excluir"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                ) : (
                                                    <button
                                                        onClick={() => onReportComment && onReportComment(comment.id)}
                                                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600"
                                                        title="Reportar"
                                                    >
                                                        <Flag className="w-4 h-4" />
                                                    </button>
                                                )}
                                            </div>
                                        </div>

                                        {/* Comment Text */}
                                        <p className="text-gray-700 leading-relaxed mb-3">{comment.content}</p>

                                        {/* Like Button */}
                                        <button
                                            onClick={() => handleLike(comment.id)}
                                            className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
                                                likedComments.has(comment.id)
                                                    ? 'bg-red-100 text-red-600'
                                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                            }`}
                                        >
                                            <ThumbsUp
                                                className="w-4 h-4"
                                                fill={likedComments.has(comment.id) ? 'currentColor' : 'none'}
                                            />
                                            <span className="text-sm font-bold">
                                                {comment.likes + (likedComments.has(comment.id) ? 1 : 0)}
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
