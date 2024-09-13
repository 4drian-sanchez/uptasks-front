import { z } from 'zod'

const taskStatusSchema = z.enum(['pending', 'onHold', 'inProgress', 'underReview', 'completed'])

const taskSchema = z.object({
    _id: z.string(),
    name: z.string(),
    description: z.string(),
    project: z.string(),
    status: taskStatusSchema,
})
export const taskProjectSchema = taskSchema.pick({
    _id: true,
    name: true,
    description: true,
    status: true
})
export type Task = z.infer< typeof taskSchema >
export type TaskFormData = Pick< Task, 'name' | 'description'  >

export type TaskProject = z.infer< typeof taskProjectSchema >

const projectSchema = z.object({
    _id: z.string(),
    projectName: z.string(),
    clientName: z.string(),
    description: z.string(),
    tasks: z.array(taskProjectSchema),
})

export const DashboardProjectSchema = z.array(
    projectSchema.pick({
        _id: true,
        projectName: true,
        clientName: true,
        description: true
    })
)

export type Project = z.infer< typeof projectSchema >
export type ProjectFormData = Pick< Project, 'clientName' | 'projectName' | 'description'>