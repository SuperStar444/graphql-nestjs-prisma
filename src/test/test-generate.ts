import { ok } from 'assert';
import AwaitEventEmitter from 'await-event-emitter/types';
import expect from 'expect';
import { uniq } from 'lodash';
import { Project } from 'ts-morph';

import { generate } from '../generate';
import { generateFileName } from '../helpers/generate-file-name';
import { EventArguments } from '../types';
import { createGeneratorOptions } from './create-generator-options';

export async function testGenerate(args: {
    schema: string;
    options?: string[];
    createSouceFile?: {
        text: string;
        name: string;
        type: string;
    };
    onConnect?: (emitter: AwaitEventEmitter) => void;
}) {
    const { schema, options, createSouceFile, onConnect } = args;
    let project: Project | undefined;
    const connectCallback = (emitter: AwaitEventEmitter) => {
        onConnect && onConnect(emitter);
        emitter.off('GenerateFiles');
        if (createSouceFile) {
            emitter.on(
                'PostBegin',
                ({ config, project, output, getModelName }: EventArguments) => {
                    const filePath = generateFileName({
                        type: createSouceFile.type,
                        name: createSouceFile.name,
                        getModelName,
                        template: config.outputFilePattern,
                    });
                    project.createSourceFile(
                        `${output}/${filePath}`,
                        createSouceFile.text,
                        { overwrite: true },
                    );
                },
            );
        }
        emitter.on('End', (args: { project: Project }) => {
            ({ project } = args);
        });
    };
    await generate({
        ...(await createGeneratorOptions(schema, options)),
        skipAddOutputSourceFiles: true,
        connectCallback,
    });

    ok(project, 'Project is not defined');
    const sourceFiles = project.getSourceFiles();

    for (const sourceFile of sourceFiles) {
        const filePath = sourceFile.getFilePath();
        const text = sourceFile.getText();
        if (!text) {
            throw `Project should not contain empty files: ${filePath}`;
        }
        const imports = sourceFile
            .getImportDeclarations()
            .map(d => d.getStructure())
            .flatMap(s => {
                return [...s.namedImports?.map(x => x.name), s.namespaceImport].filter(
                    Boolean,
                );
            });
        if (uniq(imports).length !== imports.length) {
            throw `Duplicated import in ${filePath}: ${imports.toString()}`;
        }
    }

    return { project, sourceFiles };
}