'use client'

import { useEffect, useState, useMemo } from 'react'
import { useParams } from 'next/navigation'
import { supabase } from '@/lib/supabase/client'
import { RoleView } from '@/components/auth/RoleView'
import { PermissionGate } from '@/components/auth/PermissionGate'
import {
  BookOpen, Clock, Calendar, User, ArrowLeft, Edit, CheckCircle, Heart,
  FileText, Video, Music2, ExternalLink, Play, Music, Zap, Flag,
  Loader2, ClipboardCheck, MessageSquare, Send, Trash2, ChevronRight,
  Star, AlertCircle, Plus, X, Save, Tag, Reply, Sparkles,
} from 'lucide-react'
import Link from 'next/link'
import {
  completeLesson, toggleLessonFavorite, toggleChecklist,
  createLessonComment, deleteLessonComment, updateLessonStatus,
  createMaterial, updateMaterial, deleteMaterial,
  createActivity, updateActivity, deleteActivity,
  createCriteria, updateCriteria, deleteCriteria,
  addLessonTag, removeLessonTag,
} from '@/app/actions/lesson-actions'
import { generateLessonMaterials } from '@/app/actions/ai-actions'
import MediaPlayer from '@/components/ui/media-player'
import FileUpload from '@/components/ui/file-upload'
import { getLessonLevel, LEVEL_COLORS, STATUS_LABELS, STATUS_COLORS, ACTIVITY_TYPE_CONFIG, MATERIAL_TYPE_LABELS } from '@/lib/lessons/constants'
import type { Tables } from '@/lib/supabase/database.types'

type Lesson = Tables<'v_lessons'>
type Material = Tables<'v_lesson_materials'>
type Activity = Tables<'v_lesson_activities'>
type Criteria = Tables<'v_evaluation_criteria'>
type Checklist = Tables<'v_lesson_checklists'>
type LessonProgress = Tables<'v_lesson_progress'>
type LessonComment = Tables<'v_lesson_comments'>

const materialIcons: Record<string, typeof FileText> = {
  document: FileText,
  video: Video,
  audio: Music2,
  link: ExternalLink,
  sheet_music: Music,
}

const activityIcons: Record<string, typeof Play> = {
  abertura: Play,
  principal: Music,
  alpha: Zap,
  final: Flag,
}

type TabKey = 'antes' | 'durante' | 'depois'

// =============================================
// Inline Form Components
// =============================================

const UPLOAD_ACCEPT: Record<string, string[]> = {
  document: ['application/pdf', 'image/*'],
  audio: ['audio/*'],
  video: ['video/*'],
  sheet_music: ['application/pdf', 'image/*'],
}

function MaterialForm({ lessonId, material, onSave, onCancel }: {
  lessonId: string
  material?: Material
  onSave: () => void
  onCancel: () => void
}) {
  const [title, setTitle] = useState(material?.title || '')
  const [description, setDescription] = useState(material?.description || '')
  const [materialType, setMaterialType] = useState(material?.material_type || 'document')
  const [fileUrl, setFileUrl] = useState(material?.file_url || '')
  const [orderIndex, setOrderIndex] = useState(material?.order_index ?? 0)
  const [saving, setSaving] = useState(false)
  const [showUrlInput, setShowUrlInput] = useState(false)

  const canUpload = materialType !== 'link'
  const currentUrlValid = fileUrl && fileUrl !== '#'

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    const payload = material
      ? { id: material.id, title, description: description || undefined, material_type: materialType, file_url: fileUrl || undefined, order_index: orderIndex }
      : { lesson_id: lessonId, title, description: description || undefined, material_type: materialType, file_url: fileUrl || undefined, order_index: orderIndex }
    const result = material ? await updateMaterial(payload) : await createMaterial(payload)
    if (result.success) onSave()
    setSaving(false)
  }

  return (
    <form onSubmit={handleSubmit} className="bg-blue-50/50 border border-blue-200 rounded-xl p-4 space-y-3">
      <div className="flex gap-3">
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Titulo do material" required
          className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-200" />
        <select value={materialType} onChange={e => { setMaterialType(e.target.value); setShowUrlInput(false) }}
          className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-200">
          <option value="document">Documento</option>
          <option value="video">Video</option>
          <option value="audio">Audio</option>
          <option value="link">Link</option>
          <option value="sheet_music">Partitura</option>
        </select>
      </div>
      <input value={description} onChange={e => setDescription(e.target.value)} placeholder="Descricao (opcional)"
        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-200" />

      {/* File Upload or URL Input */}
      {canUpload && !showUrlInput ? (
        <div className="space-y-2">
          <FileUpload
            bucket="lessons"
            pathPrefix={`materials/${lessonId}`}
            accept={UPLOAD_ACCEPT[materialType] || ['application/pdf', 'image/*']}
            maxSizeMB={100}
            onUpload={(url) => setFileUrl(url)}
            onRemove={() => setFileUrl('')}
            currentUrl={currentUrlValid ? fileUrl : undefined}
            label={materialType === 'video' ? 'Upload de video (ou cole URL abaixo)' : undefined}
            compact
          />
          <button
            type="button"
            onClick={() => setShowUrlInput(true)}
            className="text-xs text-blue-500 hover:text-blue-700 hover:underline"
          >
            {materialType === 'video' ? 'Colar link do YouTube' : 'Inserir URL manualmente'}
          </button>
        </div>
      ) : (
        <div className="space-y-2">
          <div className="flex gap-3">
            <input
              value={fileUrl === '#' ? '' : fileUrl}
              onChange={e => setFileUrl(e.target.value)}
              placeholder={materialType === 'video' ? 'URL do YouTube ou video' : materialType === 'link' ? 'URL do link' : 'URL do arquivo'}
              className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
            <input type="number" value={orderIndex} onChange={e => setOrderIndex(Number(e.target.value))} placeholder="Ordem" min={0}
              className="w-20 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-200" />
          </div>
          {canUpload && (
            <button
              type="button"
              onClick={() => setShowUrlInput(false)}
              className="text-xs text-blue-500 hover:text-blue-700 hover:underline"
            >
              Fazer upload de arquivo
            </button>
          )}
        </div>
      )}

      {/* Order index (when using upload mode) */}
      {canUpload && !showUrlInput && (
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500">Ordem:</span>
          <input type="number" value={orderIndex} onChange={e => setOrderIndex(Number(e.target.value))} min={0}
            className="w-20 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-200" />
        </div>
      )}

      <div className="flex justify-end gap-2">
        <button type="button" onClick={onCancel} className="px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded-lg">Cancelar</button>
        <button type="submit" disabled={saving || !title.trim()} className="px-4 py-1.5 text-sm bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 flex items-center gap-1">
          {saving ? <Loader2 className="w-3 h-3 animate-spin" /> : <Save className="w-3 h-3" />}
          {material ? 'Salvar' : 'Adicionar'}
        </button>
      </div>
    </form>
  )
}

function ActivityForm({ lessonId, activity, onSave, onCancel }: {
  lessonId: string
  activity?: Activity
  onSave: () => void
  onCancel: () => void
}) {
  const [title, setTitle] = useState(activity?.title || '')
  const [description, setDescription] = useState(activity?.description || '')
  const [activityType, setActivityType] = useState(activity?.activity_type || 'principal')
  const [durationMinutes, setDurationMinutes] = useState(activity?.duration_minutes ?? '')
  const [orderIndex, setOrderIndex] = useState(activity?.order_index ?? 0)
  const [saving, setSaving] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    const dur = durationMinutes ? Number(durationMinutes) : undefined
    const payload = activity
      ? { id: activity.id, title, description: description || undefined, activity_type: activityType, duration_minutes: dur, order_index: orderIndex }
      : { lesson_id: lessonId, title, description: description || undefined, activity_type: activityType, duration_minutes: dur, order_index: orderIndex }
    const result = activity ? await updateActivity(payload) : await createActivity(payload)
    if (result.success) onSave()
    setSaving(false)
  }

  return (
    <form onSubmit={handleSubmit} className="bg-green-50/50 border border-green-200 rounded-xl p-4 space-y-3">
      <div className="flex gap-3">
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Titulo da atividade" required
          className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-200" />
        <select value={activityType} onChange={e => setActivityType(e.target.value)}
          className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-200">
          <option value="abertura">Abertura</option>
          <option value="principal">Principal</option>
          <option value="alpha">Desafio Alpha</option>
          <option value="final">Encerramento</option>
        </select>
      </div>
      <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Descricao da atividade (opcional)" rows={2}
        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-200 resize-none" />
      <div className="flex gap-3">
        <input type="number" value={durationMinutes} onChange={e => setDurationMinutes(e.target.value)} placeholder="Duracao (min)" min={1} max={480}
          className="w-36 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-200" />
        <input type="number" value={orderIndex} onChange={e => setOrderIndex(Number(e.target.value))} placeholder="Ordem" min={0}
          className="w-20 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-200" />
      </div>
      <div className="flex justify-end gap-2">
        <button type="button" onClick={onCancel} className="px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded-lg">Cancelar</button>
        <button type="submit" disabled={saving || !title.trim()} className="px-4 py-1.5 text-sm bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 disabled:opacity-50 flex items-center gap-1">
          {saving ? <Loader2 className="w-3 h-3 animate-spin" /> : <Save className="w-3 h-3" />}
          {activity ? 'Salvar' : 'Adicionar'}
        </button>
      </div>
    </form>
  )
}

function CriteriaForm({ lessonId, criteria, onSave, onCancel }: {
  lessonId: string
  criteria?: Criteria
  onSave: () => void
  onCancel: () => void
}) {
  const [name, setName] = useState(criteria?.name || '')
  const [description, setDescription] = useState(criteria?.description || '')
  const [weight, setWeight] = useState(criteria?.weight ?? 1)
  const [orderIndex, setOrderIndex] = useState(criteria?.order_index ?? 0)
  const [saving, setSaving] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    const payload = criteria
      ? { id: criteria.id, name, description: description || undefined, weight, order_index: orderIndex }
      : { lesson_id: lessonId, name, description: description || undefined, weight, order_index: orderIndex }
    const result = criteria ? await updateCriteria(payload) : await createCriteria(payload)
    if (result.success) onSave()
    setSaving(false)
  }

  return (
    <form onSubmit={handleSubmit} className="bg-purple-50/50 border border-purple-200 rounded-xl p-4 space-y-3">
      <input value={name} onChange={e => setName(e.target.value)} placeholder="Nome do criterio" required
        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-200" />
      <input value={description} onChange={e => setDescription(e.target.value)} placeholder="Descricao (opcional)"
        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-200" />
      <div className="flex gap-3">
        <div className="flex items-center gap-2">
          <label className="text-xs text-gray-500">Peso:</label>
          <input type="number" value={weight} onChange={e => setWeight(Number(e.target.value))} min={0} max={100} step={0.1}
            className="w-20 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-200" />
        </div>
        <div className="flex items-center gap-2">
          <label className="text-xs text-gray-500">Ordem:</label>
          <input type="number" value={orderIndex} onChange={e => setOrderIndex(Number(e.target.value))} min={0}
            className="w-20 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-200" />
        </div>
      </div>
      <div className="flex justify-end gap-2">
        <button type="button" onClick={onCancel} className="px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded-lg">Cancelar</button>
        <button type="submit" disabled={saving || !name.trim()} className="px-4 py-1.5 text-sm bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 disabled:opacity-50 flex items-center gap-1">
          {saving ? <Loader2 className="w-3 h-3 animate-spin" /> : <Save className="w-3 h-3" />}
          {criteria ? 'Salvar' : 'Adicionar'}
        </button>
      </div>
    </form>
  )
}

// =============================================
// Main Page
// =============================================

export default function LessonDetailPage() {
  const { id } = useParams<{ id: string }>()
  const [lesson, setLesson] = useState<Lesson | null>(null)
  const [materials, setMaterials] = useState<Material[]>([])
  const [activities, setActivities] = useState<Activity[]>([])
  const [criteria, setCriteria] = useState<Criteria[]>([])
  const [aiContent, setAiContent] = useState<{ id: string; content_type: string; title: string; content: string; metadata: any }[]>([])
  const [generatingAI, setGeneratingAI] = useState(false)
  const [expandedAI, setExpandedAI] = useState<string | null>(null)
  const [checklists, setChecklists] = useState<Checklist[]>([])
  const [progress, setProgress] = useState<LessonProgress | null>(null)
  const [comments, setComments] = useState<LessonComment[]>([])
  const [tags, setTags] = useState<{ id: string; tag: string }[]>([])
  const [isFavorited, setIsFavorited] = useState(false)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<TabKey>('antes')
  const [completing, setCompleting] = useState(false)
  const [completionSuccess, setCompletionSuccess] = useState(false)
  const [togglingFav, setTogglingFav] = useState(false)
  const [commentText, setCommentText] = useState('')
  const [replyTo, setReplyTo] = useState<LessonComment | null>(null)
  const [sendingComment, setSendingComment] = useState(false)
  const [statusChanging, setStatusChanging] = useState(false)

  // Management state
  const [showMaterialForm, setShowMaterialForm] = useState(false)
  const [editingMaterial, setEditingMaterial] = useState<Material | null>(null)
  const [showActivityForm, setShowActivityForm] = useState(false)
  const [editingActivity, setEditingActivity] = useState<Activity | null>(null)
  const [showCriteriaForm, setShowCriteriaForm] = useState(false)
  const [editingCriteria, setEditingCriteria] = useState<Criteria | null>(null)
  const [newTag, setNewTag] = useState('')
  const [addingTag, setAddingTag] = useState(false)

  async function loadData() {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      const userId = user?.id

      const { data: lessonData } = await supabase.from('v_lessons').select('*').eq('id', id).single()
      if (lessonData) setLesson(lessonData as Lesson)

      const { data: materialsData } = await supabase.from('v_lesson_materials').select('*').eq('lesson_id', id).order('order_index')
      if (materialsData) setMaterials(materialsData as Material[])

      const { data: activitiesData } = await supabase.from('v_lesson_activities').select('*').eq('lesson_id', id).order('order_index')
      if (activitiesData) setActivities(activitiesData as Activity[])

      const { data: criteriaData } = await supabase.from('v_evaluation_criteria').select('*').eq('lesson_id', id).order('order_index')
      if (criteriaData) setCriteria(criteriaData as Criteria[])

      const { data: checklistsData } = await supabase.from('v_lesson_checklists').select('*').eq('lesson_id', id)
      if (checklistsData) setChecklists(checklistsData as Checklist[])

      const { data: commentsData } = await supabase.from('v_lesson_comments').select('*').eq('lesson_id', id).order('created_at', { ascending: true })
      if (commentsData) setComments(commentsData as LessonComment[])

      const { data: tagsData } = await supabase.from('lesson_tags' as any).select('id, tag').eq('lesson_id', id)
      if (tagsData) setTags(tagsData as any[])

      const { data: aiData } = await supabase.from('v_ai_generated_content' as any).select('id, content_type, title, content, metadata').eq('lesson_id', id).eq('status', 'active').order('created_at', { ascending: false })
      if (aiData) setAiContent(aiData as any[])

      if (userId) {
        const { data: progressData } = await supabase
          .from('v_lesson_progress')
          .select('*')
          .eq('lesson_id', id)
          .eq('student_id', userId)
          .maybeSingle()
        if (progressData) setProgress(progressData as LessonProgress)

        const { data: favData } = await supabase
          .from('lesson_favorites' as any)
          .select('id')
          .eq('lesson_id', id)
          .eq('student_id', userId)
          .maybeSingle()
        setIsFavorited(!!favData)
      }
    } catch (error) {
      console.error('Error loading lesson:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (id) loadData()
  }, [id])

  async function reload() {
    setLoading(false)
    await loadData()
  }

  async function handleComplete() {
    if (completing || completionSuccess) return
    setCompleting(true)
    const result = await completeLesson(id)
    if (result.success) {
      setCompletionSuccess(true)
      setProgress(prev => prev
        ? { ...prev, is_completed: true, progress_percent: 100 }
        : { id: '', tenant_id: '', lesson_id: id, student_id: '', is_completed: true, progress_percent: 100, notes: null, completed_at: new Date().toISOString(), created_at: '', lesson_title: null, lesson_number: null }
      )
    }
    setCompleting(false)
  }

  async function handleToggleFavorite() {
    if (togglingFav) return
    setTogglingFav(true)
    const result = await toggleLessonFavorite(id)
    if (result.success) {
      setIsFavorited(!isFavorited)
    }
    setTogglingFav(false)
  }

  async function handleToggleChecklist(checklistId: string, newValue: boolean) {
    const result = await toggleChecklist({ checklist_id: checklistId, is_done: newValue })
    if (result.success) {
      setChecklists(prev => prev.map(c => c.id === checklistId ? { ...c, is_done: newValue } : c))
    }
  }

  async function handleSendComment(e: React.FormEvent) {
    e.preventDefault()
    if (!commentText.trim() || sendingComment) return
    setSendingComment(true)
    const result = await createLessonComment({
      lesson_id: id,
      content: commentText.trim(),
      parent_id: replyTo?.id,
    })
    if (result.success) {
      setCommentText('')
      setReplyTo(null)
      const { data } = await supabase.from('v_lesson_comments').select('*').eq('lesson_id', id).order('created_at', { ascending: true })
      if (data) setComments(data as LessonComment[])
    }
    setSendingComment(false)
  }

  async function handleDeleteComment(commentId: string) {
    const result = await deleteLessonComment(commentId)
    if (result.success) {
      setComments(prev => prev.filter(c => c.id !== commentId))
    }
  }

  async function handleStatusChange(newStatus: string) {
    if (statusChanging) return
    setStatusChanging(true)
    const result = await updateLessonStatus({ lesson_id: id, status: newStatus })
    if (result.success && lesson) {
      setLesson({ ...lesson, status: newStatus as Lesson['status'] })
    }
    setStatusChanging(false)
  }

  async function handleDeleteMaterial(materialId: string) {
    const result = await deleteMaterial(materialId)
    if (result.success) {
      setMaterials(prev => prev.filter(m => m.id !== materialId))
    }
  }

  async function handleDeleteActivity(activityId: string) {
    const result = await deleteActivity(activityId)
    if (result.success) {
      setActivities(prev => prev.filter(a => a.id !== activityId))
    }
  }

  async function handleDeleteCriteria(criteriaId: string) {
    const result = await deleteCriteria(criteriaId)
    if (result.success) {
      setCriteria(prev => prev.filter(c => c.id !== criteriaId))
    }
  }

  async function handleAddTag() {
    if (!newTag.trim() || addingTag) return
    setAddingTag(true)
    const result = await addLessonTag({ lesson_id: id, tag: newTag.trim() })
    if (result.success && result.data) {
      setTags(prev => [...prev, { id: (result.data as any).id, tag: newTag.trim() }])
      setNewTag('')
    }
    setAddingTag(false)
  }

  async function handleRemoveTag(tagId: string) {
    const result = await removeLessonTag({ id: tagId })
    if (result.success) {
      setTags(prev => prev.filter(t => t.id !== tagId))
    }
  }

  // Build comment tree
  const commentTree = useMemo(() => {
    const rootComments = comments.filter(c => !c.parent_id)
    const childMap = new Map<string, LessonComment[]>()
    comments.filter(c => c.parent_id).forEach(c => {
      const existing = childMap.get(c.parent_id!) || []
      existing.push(c)
      childMap.set(c.parent_id!, existing)
    })
    return { roots: rootComments, childMap }
  }, [comments])

  if (loading) return (
    <div className="space-y-6 animate-pulse">
      <div className="h-48 bg-gray-200 rounded-2xl" />
      <div className="h-12 bg-gray-200 rounded-xl" />
      <div className="h-64 bg-gray-200 rounded-2xl" />
    </div>
  )

  if (!lesson) return (
    <div className="text-center py-16">
      <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
      <p className="text-gray-500">Aula nao encontrada.</p>
      <Link href="/lessons" className="text-blue-600 hover:underline mt-4 inline-block">Voltar</Link>
    </div>
  )

  const level = getLessonLevel(lesson.number)
  const levelColors = LEVEL_COLORS[level === 'intermediario' ? 'yellow' : level === 'avancado' ? 'red' : level === 'showFinal' ? 'blue' : 'green']

  const tabs: { key: TabKey; label: string; icon: typeof BookOpen }[] = [
    { key: 'antes', label: 'Antes da Aula', icon: BookOpen },
    { key: 'durante', label: 'Durante', icon: Play },
    { key: 'depois', label: 'Depois', icon: CheckCircle },
  ]

  // Group activities by type
  const activityGroups = activities.reduce((acc, act) => {
    const type = act.activity_type || 'principal'
    if (!acc[type]) acc[type] = []
    acc[type].push(act)
    return acc
  }, {} as Record<string, Activity[]>)

  const activityOrder = ['abertura', 'principal', 'alpha', 'final']

  // Group checklists
  const prepChecklists = checklists.filter(c => c.checklist_type === 'preparation')
  const evalChecklists = checklists.filter(c => c.checklist_type !== 'preparation')
  const checklistDone = checklists.filter(c => c.is_done).length
  const checklistTotal = checklists.length

  const isCompleted = progress?.is_completed

  function CommentItem({ comment, depth = 0 }: { comment: LessonComment; depth?: number }) {
    const children = commentTree.childMap.get(comment.id) || []
    return (
      <div className={depth > 0 ? 'ml-8 border-l-2 border-blue-100 pl-3' : ''}>
        <div className="flex gap-3 p-3 rounded-lg bg-gray-50">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-xs font-bold flex-shrink-0">
            {(comment.author_name || '?')[0].toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-900">{comment.author_name || 'Usuario'}</span>
              <span className="text-xs text-gray-400">
                {new Date(comment.created_at).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
            <p className="text-sm text-gray-600 mt-1">{comment.content}</p>
            <button
              onClick={() => { setReplyTo(comment); setCommentText('') }}
              className="text-xs text-blue-500 hover:text-blue-700 mt-1 flex items-center gap-1"
            >
              <Reply className="w-3 h-3" /> Responder
            </button>
          </div>
          <button
            onClick={() => handleDeleteComment(comment.id)}
            className="text-gray-300 hover:text-red-500 transition-colors flex-shrink-0"
            title="Remover"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
        {children.length > 0 && (
          <div className="space-y-2 mt-2">
            {children.map(child => (
              <CommentItem key={child.id} comment={child} depth={depth + 1} />
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Back + Actions */}
      <div className="flex items-center justify-between">
        <Link href="/lessons" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700">
          <ArrowLeft className="w-4 h-4" /> Voltar
        </Link>
        <div className="flex items-center gap-2">
          <RoleView
            student={
              <button
                onClick={handleToggleFavorite}
                disabled={togglingFav}
                className={`p-2 rounded-xl border transition-colors ${isFavorited ? 'bg-red-50 border-red-200 text-red-500' : 'bg-white border-gray-200 text-gray-400 hover:text-red-400'}`}
              >
                <Heart className={`w-5 h-5 ${isFavorited ? 'fill-current' : ''}`} />
              </button>
            }
          />
          <PermissionGate permission="lessons.create">
            <Link href={`/lessons/${id}/edit`} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors text-sm">
              <Edit className="w-4 h-4" /> Editar
            </Link>
          </PermissionGate>
        </div>
      </div>

      {/* Hero */}
      <div className={`bg-gradient-to-br ${levelColors.gradient} rounded-2xl p-8 text-white shadow-xl`}>
        <div className="flex items-center gap-3 mb-3 flex-wrap">
          {lesson.number !== null && (
            <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold nw-tabular">Aula {lesson.number}</span>
          )}
          <span className={`px-3 py-1 rounded-full text-xs font-bold ${STATUS_COLORS[lesson.status] || 'bg-white/20'}`}>
            {STATUS_LABELS[lesson.status] || lesson.status}
          </span>
          {isCompleted && (
            <span className="bg-white/30 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
              <CheckCircle className="w-3 h-3" /> Concluida
            </span>
          )}
        </div>
        <h1 className="text-2xl md:text-3xl font-bold">{lesson.title}</h1>
        {lesson.module_name && <p className="text-white/80 mt-1">{lesson.module_name}</p>}

        <div className="flex items-center gap-4 mt-4 flex-wrap text-sm text-white/80">
          {lesson.teacher_name && (
            <span className="flex items-center gap-1"><User className="w-4 h-4" />{lesson.teacher_name}</span>
          )}
          {lesson.duration_minutes && (
            <span className="flex items-center gap-1 nw-tabular"><Clock className="w-4 h-4" />{lesson.duration_minutes} min</span>
          )}
          {lesson.scheduled_date && (
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {new Date(lesson.scheduled_date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
            </span>
          )}
        </div>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex items-center gap-2 mt-4 flex-wrap">
            {tags.map(t => (
              <span key={t.id} className="bg-white/20 px-2 py-0.5 rounded-full text-xs flex items-center gap-1">
                <Tag className="w-3 h-3" /> {t.tag}
                <PermissionGate permission="lessons.create">
                  <button onClick={() => handleRemoveTag(t.id)} className="hover:text-red-200 ml-0.5"><X className="w-3 h-3" /></button>
                </PermissionGate>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Admin Status Changer + Tags */}
      <PermissionGate permission="lessons.create">
        <div className="bg-white rounded-xl border border-gray-100 p-4 flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-gray-700">Status:</span>
            <select
              value={lesson.status}
              onChange={e => handleStatusChange(e.target.value)}
              disabled={statusChanging}
              className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
            >
              <option value="draft">Rascunho</option>
              <option value="scheduled">Agendada</option>
              <option value="in_progress">Em Andamento</option>
              <option value="completed">Concluida</option>
              <option value="cancelled">Cancelada</option>
            </select>
            {statusChanging && <Loader2 className="w-4 h-4 animate-spin text-gray-400" />}
          </div>

          <div className="h-6 w-px bg-gray-200" />

          {/* Tag Input */}
          <div className="flex items-center gap-2">
            <Tag className="w-4 h-4 text-gray-400" />
            <input
              value={newTag}
              onChange={e => setNewTag(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
              placeholder="Adicionar tag..."
              className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 w-40"
            />
            <button
              onClick={handleAddTag}
              disabled={!newTag.trim() || addingTag}
              className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm text-gray-700 disabled:opacity-50"
            >
              {addingTag ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </PermissionGate>

      {/* Tab Bar */}
      <div className="flex border-b border-gray-200">
        {tabs.map(tab => {
          const Icon = tab.icon
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.key
                  ? 'border-blue-600 text-blue-700'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          )
        })}
      </div>

      {/* Tab Content */}
      {activeTab === 'antes' && (
        <div className="space-y-6">
          {/* Objetivo Didatico */}
          {lesson.learning_objective && (
            <div className="bg-white rounded-xl border border-gray-100 p-6">
              <h2 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <Star className="w-5 h-5 text-amber-500" />
                Objetivo Didatico
              </h2>
              <p className="text-sm text-gray-600 whitespace-pre-wrap">{lesson.learning_objective}</p>
            </div>
          )}

          {/* Descricao */}
          {lesson.description && (
            <div className="bg-white rounded-xl border border-gray-100 p-6">
              <h2 className="font-bold text-gray-900 mb-3">Descricao</h2>
              <p className="text-sm text-gray-600 whitespace-pre-wrap">{lesson.description}</p>
            </div>
          )}

          {/* Materiais */}
          <div className="bg-white rounded-xl border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-gray-900 flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-500" />
                Materiais de Apoio ({materials.length})
              </h2>
              <PermissionGate permission="lessons.create">
                {!showMaterialForm && !editingMaterial && (
                  <button onClick={() => setShowMaterialForm(true)} className="flex items-center gap-1 px-3 py-1.5 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 font-medium">
                    <Plus className="w-4 h-4" /> Adicionar
                  </button>
                )}
              </PermissionGate>
            </div>

            {/* Add Form */}
            {showMaterialForm && (
              <div className="mb-4">
                <MaterialForm lessonId={id} onSave={() => { setShowMaterialForm(false); reload() }} onCancel={() => setShowMaterialForm(false)} />
              </div>
            )}

            {/* Edit Form */}
            {editingMaterial && (
              <div className="mb-4">
                <MaterialForm lessonId={id} material={editingMaterial} onSave={() => { setEditingMaterial(null); reload() }} onCancel={() => setEditingMaterial(null)} />
              </div>
            )}

            {materials.length === 0 && !showMaterialForm ? (
              <p className="text-sm text-gray-400">Nenhum material disponivel para esta aula.</p>
            ) : (
              <div className="space-y-2">
                {materials.map(mat => {
                  const Icon = materialIcons[mat.material_type || 'document'] || FileText
                  const isPlaceholder = !mat.file_url || mat.file_url === '#'
                  const isMediaType = mat.material_type === 'video' || mat.material_type === 'audio'
                  const isYouTube = mat.file_url?.includes('youtube.com') || mat.file_url?.includes('youtu.be')
                  const showPlayer = !isPlaceholder && mat.file_url && (isMediaType || isYouTube)
                  return (
                    <div key={mat.id} className="space-y-2">
                      <div
                        className={`flex items-center gap-3 p-3 rounded-lg border transition-colors ${
                          isPlaceholder ? 'border-gray-100 bg-gray-50 opacity-60' : 'border-gray-100 hover:bg-blue-50 hover:border-blue-200'
                        }`}
                      >
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${isPlaceholder ? 'bg-gray-100 text-gray-400' : 'bg-blue-50 text-blue-600'}`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          {!isPlaceholder && mat.file_url && !showPlayer ? (
                            <a href={mat.file_url} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-blue-600 hover:underline truncate block">{mat.title}</a>
                          ) : (
                            <p className="text-sm font-medium text-gray-900 truncate">{mat.title}</p>
                          )}
                          {mat.description && <p className="text-xs text-gray-400 truncate">{mat.description}</p>}
                          {isPlaceholder && <p className="text-xs text-amber-500">Conteudo em breve</p>}
                        </div>
                        <span className="text-xs text-gray-400">
                          {MATERIAL_TYPE_LABELS[mat.material_type || 'document'] || mat.material_type}
                        </span>
                        <PermissionGate permission="lessons.create">
                          <button onClick={() => { setEditingMaterial(mat); setShowMaterialForm(false) }} className="text-gray-400 hover:text-blue-600 p-1" title="Editar">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button onClick={() => handleDeleteMaterial(mat.id)} className="text-gray-400 hover:text-red-500 p-1" title="Remover">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </PermissionGate>
                        {!isPlaceholder && !showPlayer && <ChevronRight className="w-4 h-4 text-gray-300" />}
                      </div>
                      {showPlayer && mat.file_url && (
                        <MediaPlayer url={mat.file_url} title={mat.title} />
                      )}
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          {/* AI-Generated Content */}
          {(aiContent.length > 0 || true) && (
            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl border border-purple-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-gray-900 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-purple-500" />
                  Conteúdo AI ({aiContent.length})
                </h2>
                <PermissionGate permission="lessons.create">
                  <button
                    onClick={async () => {
                      setGeneratingAI(true)
                      const result = await generateLessonMaterials({ lesson_id: id })
                      if (result.success) {
                        const { data: aiData } = await supabase.from('v_ai_generated_content' as any).select('id, content_type, title, content, metadata').eq('lesson_id', id).eq('status', 'active').order('created_at', { ascending: false })
                        if (aiData) setAiContent(aiData as any[])
                      }
                      setGeneratingAI(false)
                    }}
                    disabled={generatingAI}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-sm bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 font-medium disabled:opacity-50"
                  >
                    {generatingAI ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                    {aiContent.length > 0 ? 'Regenerar' : 'Gerar Material'}
                  </button>
                </PermissionGate>
              </div>

              {generatingAI ? (
                <div className="text-center py-8">
                  <Loader2 className="w-8 h-8 text-purple-400 mx-auto mb-2 animate-spin" />
                  <p className="text-sm text-purple-600">Gerando conteúdo com AI...</p>
                </div>
              ) : aiContent.length === 0 ? (
                <p className="text-sm text-purple-400">Nenhum conteúdo AI gerado ainda. Clique em "Gerar Material" acima.</p>
              ) : (
                <div className="space-y-3">
                  {aiContent.map(item => (
                    <div key={item.id} className="bg-white rounded-xl border border-purple-100 overflow-hidden">
                      <button
                        onClick={() => setExpandedAI(expandedAI === item.id ? null : item.id)}
                        className="w-full flex items-center gap-3 p-4 text-left hover:bg-purple-50/50 transition-colors"
                      >
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                          item.content_type === 'exercise' ? 'bg-blue-100 text-blue-600' : 'bg-purple-100 text-purple-600'
                        }`}>
                          {item.content_type === 'exercise' ? <Zap className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-bold text-gray-900 truncate">{item.title}</h3>
                          <p className="text-xs text-gray-400">{item.content_type === 'exercise' ? 'Exercícios' : 'Material de Apoio'}</p>
                        </div>
                        <ChevronRight className={`w-4 h-4 text-gray-300 transition-transform ${expandedAI === item.id ? 'rotate-90' : ''}`} />
                      </button>
                      {expandedAI === item.id && (
                        <div className="px-4 pb-4 border-t border-purple-50">
                          <div className="bg-gray-50 rounded-xl p-4 mt-3 text-sm text-gray-700 whitespace-pre-wrap leading-relaxed max-h-96 overflow-y-auto">
                            {item.content}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Criterios de Avaliacao */}
          <div className="bg-white rounded-xl border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-gray-900 flex items-center gap-2">
                <ClipboardCheck className="w-5 h-5 text-purple-500" />
                Criterios de Avaliacao ({criteria.length})
              </h2>
              <PermissionGate permission="lessons.create">
                {!showCriteriaForm && !editingCriteria && (
                  <button onClick={() => setShowCriteriaForm(true)} className="flex items-center gap-1 px-3 py-1.5 text-sm bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 font-medium">
                    <Plus className="w-4 h-4" /> Adicionar
                  </button>
                )}
              </PermissionGate>
            </div>

            {/* Add Form */}
            {showCriteriaForm && (
              <div className="mb-4">
                <CriteriaForm lessonId={id} onSave={() => { setShowCriteriaForm(false); reload() }} onCancel={() => setShowCriteriaForm(false)} />
              </div>
            )}

            {/* Edit Form */}
            {editingCriteria && (
              <div className="mb-4">
                <CriteriaForm lessonId={id} criteria={editingCriteria} onSave={() => { setEditingCriteria(null); reload() }} onCancel={() => setEditingCriteria(null)} />
              </div>
            )}

            {criteria.length === 0 && !showCriteriaForm ? (
              <p className="text-sm text-gray-400">Nenhum criterio definido para esta aula.</p>
            ) : (
              <div className="space-y-2">
                {criteria.map((crit, i) => (
                  <div key={crit.id} className="flex items-start gap-3 p-3 rounded-lg bg-purple-50/50 border border-purple-100">
                    <span className="w-6 h-6 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 nw-tabular">
                      {i + 1}
                    </span>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{crit.name}</p>
                      {crit.description && <p className="text-xs text-gray-500 mt-0.5">{crit.description}</p>}
                      {crit.weight > 0 && <p className="text-xs text-purple-600 mt-0.5">Peso: <span className="nw-tabular">{crit.weight}</span></p>}
                    </div>
                    <PermissionGate permission="lessons.create">
                      <button onClick={() => { setEditingCriteria(crit); setShowCriteriaForm(false) }} className="text-gray-400 hover:text-purple-600 p-1" title="Editar">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDeleteCriteria(crit.id)} className="text-gray-400 hover:text-red-500 p-1" title="Remover">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </PermissionGate>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'durante' && (
        <div className="space-y-6">
          {/* Add Activity Button */}
          <PermissionGate permission="lessons.create">
            {!showActivityForm && !editingActivity && (
              <button onClick={() => setShowActivityForm(true)} className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-600 rounded-xl hover:bg-green-100 font-medium text-sm border border-green-200">
                <Plus className="w-4 h-4" /> Nova Atividade
              </button>
            )}
          </PermissionGate>

          {/* Add Form */}
          {showActivityForm && (
            <ActivityForm lessonId={id} onSave={() => { setShowActivityForm(false); reload() }} onCancel={() => setShowActivityForm(false)} />
          )}

          {/* Edit Form */}
          {editingActivity && (
            <ActivityForm lessonId={id} activity={editingActivity} onSave={() => { setEditingActivity(null); reload() }} onCancel={() => setEditingActivity(null)} />
          )}

          {activities.length === 0 && !showActivityForm ? (
            <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
              <Play className="w-10 h-10 text-gray-300 mx-auto mb-3" />
              <p className="text-sm text-gray-400">Nenhuma atividade registrada para esta aula.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {activityOrder.map(type => {
                const group = activityGroups[type]
                if (!group || group.length === 0) return null
                const config = ACTIVITY_TYPE_CONFIG[type] || ACTIVITY_TYPE_CONFIG.principal
                const Icon = activityIcons[type] || Play

                return (
                  <div key={type} className={`rounded-xl border ${config.border} overflow-hidden`}>
                    <div className={`${config.bg} px-4 py-3 flex items-center gap-2`}>
                      <Icon className={`w-5 h-5 ${config.text}`} />
                      <h3 className={`font-bold text-sm ${config.text}`}>{config.label}</h3>
                      {group.length > 1 && (
                        <span className={`text-xs ${config.text} opacity-70`}>({group.length} itens)</span>
                      )}
                    </div>
                    <div className="bg-white divide-y divide-gray-50">
                      {group.map(act => (
                        <div key={act.id} className="px-4 py-3">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-gray-900">{act.title}</p>
                            <div className="flex items-center gap-2">
                              {act.duration_minutes && (
                                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full flex-shrink-0 nw-tabular">
                                  {act.duration_minutes} min
                                </span>
                              )}
                              <PermissionGate permission="lessons.create">
                                <button onClick={() => { setEditingActivity(act); setShowActivityForm(false) }} className="text-gray-400 hover:text-green-600 p-1" title="Editar">
                                  <Edit className="w-3 h-3" />
                                </button>
                                <button onClick={() => handleDeleteActivity(act.id)} className="text-gray-400 hover:text-red-500 p-1" title="Remover">
                                  <Trash2 className="w-3 h-3" />
                                </button>
                              </PermissionGate>
                            </div>
                          </div>
                          {act.description && (
                            <p className="text-xs text-gray-500 mt-1 whitespace-pre-wrap">{act.description}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      )}

      {activeTab === 'depois' && (
        <div className="space-y-6">
          {/* Student: Completion */}
          <RoleView
            student={
              <div className="bg-white rounded-xl border border-gray-100 p-6">
                <h2 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  Progresso
                </h2>
                {isCompleted || completionSuccess ? (
                  <div className="flex items-center gap-3 p-4 bg-green-50 rounded-xl border border-green-200">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                    <div>
                      <p className="font-bold text-green-800">Aula concluida!</p>
                      <p className="text-sm text-green-600">+10 pontos de experiencia</p>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={handleComplete}
                    disabled={completing}
                    className="w-full py-3 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {completing ? (
                      <><Loader2 className="w-5 h-5 animate-spin" /> Concluindo...</>
                    ) : (
                      <><CheckCircle className="w-5 h-5" /> Marcar como Concluida</>
                    )}
                  </button>
                )}
              </div>
            }
          />

          {/* Student: Alpha Challenge */}
          {activities.some(a => a.activity_type === 'alpha') && (
            <RoleView
              student={
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-200 p-6">
                  <h2 className="font-bold text-amber-800 mb-3 flex items-center gap-2">
                    <Zap className="w-5 h-5 text-amber-600" />
                    Desafio Alpha
                  </h2>
                  {activities.filter(a => a.activity_type === 'alpha').map(act => (
                    <div key={act.id}>
                      <p className="text-sm text-amber-700">{act.title}</p>
                      {act.description && <p className="text-xs text-amber-600 mt-1">{act.description}</p>}
                    </div>
                  ))}
                  <Link
                    href="/challenges"
                    className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-xl text-sm font-bold hover:bg-amber-700 transition-colors"
                  >
                    <Zap className="w-4 h-4" />
                    Ver Desafios
                  </Link>
                </div>
              }
            />
          )}

          {/* Teacher: Checklist */}
          <RoleView
            teacher={
              checklists.length > 0 ? (
                <div className="bg-white rounded-xl border border-gray-100 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-bold text-gray-900 flex items-center gap-2">
                      <ClipboardCheck className="w-5 h-5 text-indigo-500" />
                      Checklist
                    </h2>
                    <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full nw-tabular">
                      {checklistDone}/{checklistTotal}
                    </span>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full bg-gray-100 rounded-full h-2 mb-4">
                    <div
                      className="bg-indigo-500 h-2 rounded-full transition-all"
                      style={{ width: `${checklistTotal > 0 ? (checklistDone / checklistTotal) * 100 : 0}%` }}
                    />
                  </div>

                  {prepChecklists.length > 0 && (
                    <div className="mb-4">
                      <h3 className="text-xs font-bold text-gray-500 uppercase mb-2">Preparacao</h3>
                      <div className="space-y-1">
                        {prepChecklists.map(cl => (
                          <label key={cl.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={cl.is_done}
                              onChange={() => handleToggleChecklist(cl.id, !cl.is_done)}
                              className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <span className={`text-sm ${cl.is_done ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                              {cl.item}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}

                  {evalChecklists.length > 0 && (
                    <div>
                      <h3 className="text-xs font-bold text-gray-500 uppercase mb-2">Avaliacao</h3>
                      <div className="space-y-1">
                        {evalChecklists.map(cl => (
                          <label key={cl.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={cl.is_done}
                              onChange={() => handleToggleChecklist(cl.id, !cl.is_done)}
                              className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <span className={`text-sm ${cl.is_done ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                              {cl.item}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : null
            }
            admin={
              checklists.length > 0 ? (
                <div className="bg-white rounded-xl border border-gray-100 p-6">
                  <h2 className="font-bold text-gray-900 flex items-center gap-2 mb-3">
                    <ClipboardCheck className="w-5 h-5 text-indigo-500" />
                    Checklist (<span className="nw-tabular">{checklistDone}/{checklistTotal}</span>)
                  </h2>
                  <div className="space-y-1">
                    {checklists.map(cl => (
                      <div key={cl.id} className="flex items-center gap-2 text-sm">
                        {cl.is_done ? <CheckCircle className="w-4 h-4 text-green-500" /> : <AlertCircle className="w-4 h-4 text-gray-300" />}
                        <span className={cl.is_done ? 'text-gray-400 line-through' : 'text-gray-700'}>{cl.item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null
            }
          />

          {/* Comments with Threading */}
          <div className="bg-white rounded-xl border border-gray-100 p-6">
            <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-blue-500" />
              Comentarios ({comments.length})
            </h2>

            {commentTree.roots.length > 0 && (
              <div className="space-y-3 mb-4">
                {commentTree.roots.map(comment => (
                  <CommentItem key={comment.id} comment={comment} />
                ))}
              </div>
            )}

            {/* Reply indicator */}
            {replyTo && (
              <div className="flex items-center gap-2 mb-2 p-2 bg-blue-50 rounded-lg text-sm">
                <Reply className="w-4 h-4 text-blue-500" />
                <span className="text-blue-700">Respondendo a <strong>{replyTo.author_name || 'Usuario'}</strong></span>
                <button onClick={() => setReplyTo(null)} className="ml-auto text-gray-400 hover:text-gray-600"><X className="w-4 h-4" /></button>
              </div>
            )}

            <form onSubmit={handleSendComment} className="flex gap-2">
              <input
                type="text"
                value={commentText}
                onChange={e => setCommentText(e.target.value)}
                placeholder={replyTo ? `Responder a ${replyTo.author_name || 'Usuario'}...` : 'Escreva um comentario...'}
                className="flex-1 px-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
              />
              <button
                type="submit"
                disabled={!commentText.trim() || sendingComment}
                className="px-4 py-2 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {sendingComment ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
