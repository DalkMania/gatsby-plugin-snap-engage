import { onRenderBody } from "../gatsby-ssr"

jest.mock(`common-tags`, () => {
    return {
      stripIndent: args => args,
    }
})

describe(`gatsby-plugin-snap-engage`, () => {
    describe(`onRenderBody`, () => {
        describe(`in development mode`, () => {
            it(`it does not add the script to the body, if the includeInDevelopment option is false`, () => {
                const pluginOptions = { includeInDevelopment: false }
                const setPostBodyComponents = jest.fn()
                const pathname = ''

                onRenderBody({ pathname, setPostBodyComponents }, pluginOptions)
                expect(setPostBodyComponents).not.toHaveBeenCalled()
            })

            it(`it does add the script to the body, if the includeInDevelopment option is true`, () => {
                const pluginOptions = { multilingual: false, id: '1', includeInDevelopment: true }
                const setPostBodyComponents = jest.fn()
                const pathname = ''

                onRenderBody({ pathname, setPostBodyComponents }, pluginOptions)
                expect(setPostBodyComponents.mock.calls).toMatchSnapshot()
                expect(setPostBodyComponents).toHaveBeenCalledTimes(1)
                expect(setPostBodyComponents).toHaveBeenCalledWith([
                    expect.objectContaining({ key: `gatsby-plugin-snap-engage` }),
                ])

                const result = JSON.stringify(setPostBodyComponents.mock.calls[0][0])
                expect(result).toContain(`code.snapengage.com/js/1.js`)
            })

        })

        describe(`in production mode`, () => {
            let env

            beforeAll(() => {
                env = process.env.NODE_ENV
                process.env.NODE_ENV = `production`
            })

            afterAll(() => {
                process.env.NODE_ENV = env
            })

            it(`it does add the script to the body`, () => {
                const pluginOptions = { multilingual: false, id: '1', includeInDevelopment: true }
                const setPostBodyComponents = jest.fn()
                const pathname = ''

                onRenderBody({ pathname, setPostBodyComponents }, pluginOptions)
                expect(setPostBodyComponents.mock.calls).toMatchSnapshot()
                expect(setPostBodyComponents).toHaveBeenCalledTimes(1)
                expect(setPostBodyComponents).toHaveBeenCalledWith([
                    expect.objectContaining({ key: `gatsby-plugin-snap-engage` }),
                ])

                const result = JSON.stringify(setPostBodyComponents.mock.calls[0][0])
                expect(result).toContain(`code.snapengage.com/js/1.js`)
            })
        })
    })
})