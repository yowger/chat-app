import { Types } from "mongoose"

import request from "supertest"

import app from "@/app"

import { clearDatabase, removeTestDbEnv, setupTestDbEnv } from "../database"

import { UserModel } from "@/models"

import { createSingleChat } from "@/services/chatSvc"
import { signAccessToken } from "@/services/authSvc"
import { ChatType } from "@/enums/chat/chat"

jest.mock("@/services/chatSvc")

beforeAll(async () => {
    await setupTestDbEnv()

    jest.setTimeout(20000)
})

afterAll(async () => {
    await removeTestDbEnv()
})

afterEach(async () => {
    await clearDatabase()
})

const objectId = new Types.ObjectId()

jest.setTimeout(30000)

describe("Single route endpoints", () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    describe("POST: api/chat", () => {
        it("should match expected response", async () => {
            const userHost = await UserModel.create({
                email: "johndoe@gmail.com",
                username: "John doe",
                password: "Password123",
            })
            const userParticipant = await UserModel.create({
                email: "megatron@gmail.com",
                username: "megatron",
                password: "Password123",
            })

            const jwt = signAccessToken(userHost._id)

            const requestBody = { participant: userParticipant._id }

            const mockedCreateSingleChat = jest.mocked(createSingleChat)
            // @ts-ignore
            mockedCreateSingleChat.mockResolvedValue({
                type: ChatType.SINGLE,
                participants: [userHost._id, userParticipant._id],
                _id: objectId,
                latestMessageReadBy: [],
            })

            const { statusCode, body } = await request(app)
                .post("/api/chat/")
                .send(requestBody)
                .set("Authorization", `Bearer ${jwt}`)

            expect(statusCode).toBe(201)
            expect(body).toEqual(
                expect.objectContaining({
                    type: "single",
                    participants: expect.arrayContaining([
                        userHost._id.toString(),
                        userParticipant._id.toString(),
                    ]),
                    _id: objectId.toString(),
                    latestMessageReadBy: [],
                })
            )
        })
    })
})
