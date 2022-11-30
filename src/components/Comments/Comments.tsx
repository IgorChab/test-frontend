import React, { ChangeEvent, FC, FormEvent, ReactNode, useState } from 'react'

import { useDispatch } from 'react-redux'
import { addComment } from '../../store/entityReducer/actions'
import { IComment } from '../../store/entityReducer/entityReducer'

import styles from './Comments.module.css'

interface CommentsProps {
    taskId: string
    status: string
    comments: IComment[]
}

export const Comments: FC<CommentsProps> = ({taskId, comments, status}) => {

    const dispatch = useDispatch()
    
    const [author, setAuthor] = useState('')
    const [text, setText] = useState('')

    const handleAuthor = (e: ChangeEvent<HTMLInputElement>) => {
        setAuthor(e.target.value)
    }

    const handleTaex = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value)
    }


    const [reply, setReply] = useState<{
        active: boolean,
        replyId: null | number
    }>({
        active: false,
        replyId: null
    })

    const handleReply = (commentId: number) => {
        setReply({
            active: !reply.active,
            replyId: commentId
        })
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        if(author.trim().length === 0){
            return alert('Enter your name')
        } else if (text.trim().length === 0) {
            return alert('The comment cannot be empty')
        }
        console.log(reply)
        dispatch(addComment({author, text, taskId, status, replyId: reply.replyId}))
        setAuthor('')
        setText('')
    }

    const unwrapComments = (comments: IComment[]): ReactNode => {
        if(comments.length !== 0){
            return <div className={styles.commentsWrapper}>
                {comments.map(comment => (
                    <>
                        <div className={styles.comment} key={comment.id}>
                            <p className={styles.author}>{comment.author}:</p>
                            <p className={styles.text}>{comment.text}</p>
                            <p className={reply.active && reply.replyId === comment.id? styles.replyActive : styles.reply} onClick={() => handleReply(comment.id)}>Reply</p>
                        </div>
                        <div className={styles.commentsWrapper}>
                            {unwrapComments(comment.comments)}
                        </div>
                    </>
                ))}
            </div>
        }
    }

  return (
    <form className={styles.container} onSubmitCapture={handleSubmit}>
        <p className={styles.modalTitle}>Comments</p>
        <div>
            {unwrapComments(comments)}
        </div>
        <input type='text' placeholder='Enter your name*' className={styles.input} value={author}  onChange={handleAuthor}/><br/>
        <textarea className={styles.textarea} placeholder='What are you thoughts?' value={text} onChange={handleTaex}></textarea><br/>
        <button className={styles.btn}>
            Comment
        </button>
    </form>
  )
}
