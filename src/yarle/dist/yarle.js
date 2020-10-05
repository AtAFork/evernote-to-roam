"use strict";
/* eslint-disable @typescript-eslint/ban-ts-comment */
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * tslint:disable:no-console
 * import * as fs from 'fs';
 */
/*
 * import * as parser from 'fast-xml-parser';
 * import * as XmlStream from 'xml-stream';
 */
const flow = require("xml-flow");
// @ts-ignore
const browserify_fs_1 = require("browserify-fs");
const util_1 = require("util");
const process_node_1 = require("./process-node");
const pWriteFile = util_1.promisify(browserify_fs_1.writeFile);
// import { xmlParserOptions } from './xml-parser.options';
// try to figure out how to write this to a file in the browserify-fs, and then read it in via the droptherope for purposes of testing (i'll have to figure out how to write to browserify fs anyway)
const testDoc = `
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE en-export SYSTEM "http://xml.evernote.com/pub/evernote-export3.dtd">
<en-export export-date="20200919T225951Z" application="Evernote" version="Evernote Mac 7.8 (457453)">
<note><title>The Hard Thing about Hard Things by Ben Horowitz</title><content><![CDATA[<!DOCTYPE en-note SYSTEM "http://xml.evernote.com/pub/enml2.dtd"><en-note><div>"<span style="font-weight: bold;"><span style="font-weight: bold;">There are no shortcuts to knowledge, especially knowledge gained from personal experience</span>. Following conventional wisdom and relying on shortcuts can be worse than knowing nothing at all."</span></div><div><br /></div><div>"Former secretary of state Colin Powell says that leadership is the ability to get someone to follow you even if only out of curiosity."</div><div><br /></div><div>"During this time I learned the most important rule of raising money privately: <span style="font-weight: bold;">Look for a market of one. You only need one investor to say yes, so it’s best to ignore the other thirty who say “no.”"</span></div><div><br /></div><div>"No matter who you are, you need two kinds of friends in your life. The first kind is one you can call when something good happens, and you need someone who will be excited for you. Not a fake excitement veiling envy, but a real excitement. You need someone who will actually be more excited for you than he would be if it had happened to him. The second kind of friend is somebody you can call when things go horribly wrong— when your life is on the line and you only have one phone call. Who is it going to be? Bill Campbell is both of those friends."</div><div><br /></div><div>"An early lesson I learned in my career was that <span style="font-weight: bold;">whenever a large organization attempts to do anything, it always comes down to a single person who can delay the entire project</span>."</div><div><br /></div><div>"Startup CEOs should not play the odds. When you are building a company, you must believe there is an answer and you cannot pay attention to your odds of finding it. You just have to find it. It matters not whether your chances are nine in ten or one in a thousand; your task is the same."</div><div><br /></div><div>"Sadly, there is no secret, but <span style="font-weight: bold;">if there is one skill that stands out, it’s the ability to focus and make the best move when there are no good moves</span>."</div><div><br /></div><div>"My single biggest personal improvement as CEO occurred on the day when I stopped being too positive."</div><div><br /></div><div>"“We take care of the people, the products, and the profits— in that order.” It’s a simple saying, but it’s deep. “Taking care of the people” is the most difficult of the three by far and if you don’t do it, the other two won’t matter. Taking care of the people means that your company is a good place to work. Most workplaces are far from good. As organizations grow large, important work can go unnoticed, the hardest workers can get passed over by the best politicians, and bureaucratic processes can choke out the creativity and remove all the joy."</div><div><br /></div><div>"By far <span style="font-weight: bold;">the most difficult skill I learned as CEO was the ability to manage my own psychology</span>... The first rule of the CEO psychological meltdown is don’t talk about the psychological meltdown."</div><div><br /></div><div>"Given this stress, <span style="font-weight: bold;">CEOs often make one of the following two mistakes: 1. They take things too personally. 2. They do not take things personally enough."</span></div><div><br /></div><div>"Focus on the road, not the wall. <span style="font-weight: bold;">When someone learns to drive a race car, one of the first lessons taught is that when you are going around a curve at 200 mph, </span><span style="font-weight: bold;">do not focus on the wall; focus on the road.</span><span style="font-weight: bold;">"</span></div><div><br /></div><div>"As CEO, there will be many times when you feel like quitting. I have seen CEOs try to cope with the stress by drinking heavily, checking out, and even quitting. In each case, the CEO has a marvelous rationalization about why it was okay for him to punk out or quit, but none of them will ever be great CEOs. Great CEOs face the pain. They deal with the sleepless nights, the cold sweats, and what my friend the great Alfred Chuang (legendary cofounder and CEO of BEA Systems) calls “the torture.” <span style="font-weight: bold;">Whenever I meet a successful CEO, I ask them how they did it. Mediocre CEOs point to their brilliant strategic moves or their intuitive business sense or a variety of other self-congratulatory explanations. <span style="font-weight: bold;">The great CEOs tend to be remarkably consistent in their answers. They all say, “I didn’t quit.”</span></span><span>"</span></div><div><br /></div><div>"...the best management book I’ve ever read (High Output Management)"</div><div><br /></div><div>"<span style="font-weight: bold;">Watered-down feedback can be worse than no feedback at all because it’s deceptive and confusing to the recipient. But don’t beat them up or attempt to show your superiority. Doing so will defeat your purpose because when done properly, feedback is a dialogue, not a monologue.</span>"</div><div><br /></div><div><br /></div><div><br /></div><div><br /></div><div><br /></div><div><br /></div><div><br /></div><div><br /></div><div><br /></div><div><br /></div><div><br /></div><div><br /></div><div><br /></div><div><br /></div><div><br /></div><div><br /></div></en-note>]]></content><created>20171007T211346Z</created><updated>20191231T053746Z</updated><note-attributes><latitude>40.75740098417923</latitude><longitude>-73.9647433447217</longitude><altitude>24.86785125732422</altitude><author>Nat Eliason</author><source>desktop.mac</source><reminder-order>0</reminder-order></note-attributes></note>

<note><title>Dummy Note</title><content><![CDATA[<!DOCTYPE en-note SYSTEM "http://xml.evernote.com/pub/enml2.dtd"><en-note><div>"<span style="font-weight: bold;"><span style="font-weight: bold;">There are no shortcuts to knowledge, especially knowledge gained from personal experience</span>. Following conventional wisdom and relying on shortcuts can be worse than knowing nothing at all."</span></div><div><br /></div><div>"Former secretary of state Colin Powell says that leadership is the ability to get someone to follow you even if only out of curiosity."</div><div><br /></div><div>"During this time I learned the most important rule of raising money privately: <span style="font-weight: bold;">Look for a market of one. You only need one investor to say yes, so it’s best to ignore the other thirty who say “no.”"</span></div><div><br /></div><div>"No matter who you are, you need two kinds of friends in your life. The first kind is one you can call when something good happens, and you need someone who will be excited for you. Not a fake excitement veiling envy, but a real excitement. You need someone who will actually be more excited for you than he would be if it had happened to him. The second kind of friend is somebody you can call when things go horribly wrong— when your life is on the line and you only have one phone call. Who is it going to be? Bill Campbell is both of those friends."</div><div><br /></div><div>"An early lesson I learned in my career was that <span style="font-weight: bold;">whenever a large organization attempts to do anything, it always comes down to a single person who can delay the entire project</span>."</div><div><br /></div><div>"Startup CEOs should not play the odds. When you are building a company, you must believe there is an answer and you cannot pay attention to your odds of finding it. You just have to find it. It matters not whether your chances are nine in ten or one in a thousand; your task is the same."</div><div><br /></div><div>"Sadly, there is no secret, but <span style="font-weight: bold;">if there is one skill that stands out, it’s the ability to focus and make the best move when there are no good moves</span>."</div><div><br /></div><div>"My single biggest personal improvement as CEO occurred on the day when I stopped being too positive."</div><div><br /></div><div>"“We take care of the people, the products, and the profits— in that order.” It’s a simple saying, but it’s deep. “Taking care of the people” is the most difficult of the three by far and if you don’t do it, the other two won’t matter. Taking care of the people means that your company is a good place to work. Most workplaces are far from good. As organizations grow large, important work can go unnoticed, the hardest workers can get passed over by the best politicians, and bureaucratic processes can choke out the creativity and remove all the joy."</div><div><br /></div><div>"By far <span style="font-weight: bold;">the most difficult skill I learned as CEO was the ability to manage my own psychology</span>... The first rule of the CEO psychological meltdown is don’t talk about the psychological meltdown."</div><div><br /></div><div>"Given this stress, <span style="font-weight: bold;">CEOs often make one of the following two mistakes: 1. They take things too personally. 2. They do not take things personally enough."</span></div><div><br /></div><div>"Focus on the road, not the wall. <span style="font-weight: bold;">When someone learns to drive a race car, one of the first lessons taught is that when you are going around a curve at 200 mph, </span><span style="font-weight: bold;">do not focus on the wall; focus on the road.</span><span style="font-weight: bold;">"</span></div><div><br /></div><div>"As CEO, there will be many times when you feel like quitting. I have seen CEOs try to cope with the stress by drinking heavily, checking out, and even quitting. In each case, the CEO has a marvelous rationalization about why it was okay for him to punk out or quit, but none of them will ever be great CEOs. Great CEOs face the pain. They deal with the sleepless nights, the cold sweats, and what my friend the great Alfred Chuang (legendary cofounder and CEO of BEA Systems) calls “the torture.” <span style="font-weight: bold;">Whenever I meet a successful CEO, I ask them how they did it. Mediocre CEOs point to their brilliant strategic moves or their intuitive business sense or a variety of other self-congratulatory explanations. <span style="font-weight: bold;">The great CEOs tend to be remarkably consistent in their answers. They all say, “I didn’t quit.”</span></span><span>"</span></div><div><br /></div><div>"...the best management book I’ve ever read (High Output Management)"</div><div><br /></div><div>"<span style="font-weight: bold;">Watered-down feedback can be worse than no feedback at all because it’s deceptive and confusing to the recipient. But don’t beat them up or attempt to show your superiority. Doing so will defeat your purpose because when done properly, feedback is a dialogue, not a monologue.</span>"</div><div><br /></div><div><br /></div><div><br /></div><div><br /></div><div><br /></div><div><br /></div><div><br /></div><div><br /></div><div><br /></div><div><br /></div><div><br /></div><div><br /></div><div><br /></div><div><br /></div><div><br /></div><div><br /></div></en-note>]]></content><created>20171007T211346Z</created><updated>20191231T053746Z</updated><note-attributes><latitude>40.75740098417923</latitude><longitude>-73.9647433447217</longitude><altitude>24.86785125732422</altitude><author>Nat Eliason</author><source>desktop.mac</source><reminder-order>0</reminder-order></note-attributes></note>

<note><title>Dummy Note 2</title><content><![CDATA[<!DOCTYPE en-note SYSTEM "http://xml.evernote.com/pub/enml2.dtd"><en-note><div>"<span style="font-weight: bold;"><span style="font-weight: bold;">There are no shortcuts to knowledge, especially knowledge gained from personal experience</span>. Following conventional wisdom and relying on shortcuts can be worse than knowing nothing at all."</span></div><div><br /></div><div>"Former secretary of state Colin Powell says that leadership is the ability to get someone to follow you even if only out of curiosity."</div><div><br /></div><div>"During this time I learned the most important rule of raising money privately: <span style="font-weight: bold;">Look for a market of one. You only need one investor to say yes, so it’s best to ignore the other thirty who say “no.”"</span></div><div><br /></div><div>"No matter who you are, you need two kinds of friends in your life. The first kind is one you can call when something good happens, and you need someone who will be excited for you. Not a fake excitement veiling envy, but a real excitement. You need someone who will actually be more excited for you than he would be if it had happened to him. The second kind of friend is somebody you can call when things go horribly wrong— when your life is on the line and you only have one phone call. Who is it going to be? Bill Campbell is both of those friends."</div><div><br /></div><div>"An early lesson I learned in my career was that <span style="font-weight: bold;">whenever a large organization attempts to do anything, it always comes down to a single person who can delay the entire project</span>."</div><div><br /></div><div>"Startup CEOs should not play the odds. When you are building a company, you must believe there is an answer and you cannot pay attention to your odds of finding it. You just have to find it. It matters not whether your chances are nine in ten or one in a thousand; your task is the same."</div><div><br /></div><div>"Sadly, there is no secret, but <span style="font-weight: bold;">if there is one skill that stands out, it’s the ability to focus and make the best move when there are no good moves</span>."</div><div><br /></div><div>"My single biggest personal improvement as CEO occurred on the day when I stopped being too positive."</div><div><br /></div><div>"“We take care of the people, the products, and the profits— in that order.” It’s a simple saying, but it’s deep. “Taking care of the people” is the most difficult of the three by far and if you don’t do it, the other two won’t matter. Taking care of the people means that your company is a good place to work. Most workplaces are far from good. As organizations grow large, important work can go unnoticed, the hardest workers can get passed over by the best politicians, and bureaucratic processes can choke out the creativity and remove all the joy."</div><div><br /></div><div>"By far <span style="font-weight: bold;">the most difficult skill I learned as CEO was the ability to manage my own psychology</span>... The first rule of the CEO psychological meltdown is don’t talk about the psychological meltdown."</div><div><br /></div><div>"Given this stress, <span style="font-weight: bold;">CEOs often make one of the following two mistakes: 1. They take things too personally. 2. They do not take things personally enough."</span></div><div><br /></div><div>"Focus on the road, not the wall. <span style="font-weight: bold;">When someone learns to drive a race car, one of the first lessons taught is that when you are going around a curve at 200 mph, </span><span style="font-weight: bold;">do not focus on the wall; focus on the road.</span><span style="font-weight: bold;">"</span></div><div><br /></div><div>"As CEO, there will be many times when you feel like quitting. I have seen CEOs try to cope with the stress by drinking heavily, checking out, and even quitting. In each case, the CEO has a marvelous rationalization about why it was okay for him to punk out or quit, but none of them will ever be great CEOs. Great CEOs face the pain. They deal with the sleepless nights, the cold sweats, and what my friend the great Alfred Chuang (legendary cofounder and CEO of BEA Systems) calls “the torture.” <span style="font-weight: bold;">Whenever I meet a successful CEO, I ask them how they did it. Mediocre CEOs point to their brilliant strategic moves or their intuitive business sense or a variety of other self-congratulatory explanations. <span style="font-weight: bold;">The great CEOs tend to be remarkably consistent in their answers. They all say, “I didn’t quit.”</span></span><span>"</span></div><div><br /></div><div>"...the best management book I’ve ever read (High Output Management)"</div><div><br /></div><div>"<span style="font-weight: bold;">Watered-down feedback can be worse than no feedback at all because it’s deceptive and confusing to the recipient. But don’t beat them up or attempt to show your superiority. Doing so will defeat your purpose because when done properly, feedback is a dialogue, not a monologue.</span>"</div><div><br /></div><div><br /></div><div><br /></div><div><br /></div><div><br /></div><div><br /></div><div><br /></div><div><br /></div><div><br /></div><div><br /></div><div><br /></div><div><br /></div><div><br /></div><div><br /></div><div><br /></div><div><br /></div></en-note>]]></content><created>20171007T211346Z</created><updated>20191231T053746Z</updated><note-attributes><latitude>40.75740098417923</latitude><longitude>-73.9647433447217</longitude><altitude>24.86785125732422</altitude><author>Nat Eliason</author><source>desktop.mac</source><reminder-order>0</reminder-order></note-attributes></note>

</en-export>

`;
// eslint-disable-next-line import/no-mutable-exports
exports.yarleOptions = {
    enexFile: 'notebook.enex',
    outputDir: './mdNotes',
    isMetadataNeeded: false,
    isZettelkastenNeeded: false,
    plainTextNotesOnly: false,
};
const setOptions = (options) => {
    exports.yarleOptions = Object.assign(Object.assign({}, exports.yarleOptions), options);
};
exports.parseStream = async (options) => {
    const stream = browserify_fs_1.createReadStream(options.enexFile);
    // const xml = new XmlStream(stream);
    let noteNumber = 0;
    let failed = 0;
    let totalNotes = 0;
    const xmlStream = await flow(stream);
    return new Promise((resolve, reject) => {
        console.log('inside return promise');
        const logAndReject = (error) => {
            console.log(`Could not convert ${options.enexFile}:\n${error.message}`);
            // eslint-disable-next-line no-plusplus
            ++failed;
            return reject();
        };
        xmlStream.on('tag:en-export', (enExport) => {
            // eslint-disable-next-line no-ternary
            totalNotes = Array.isArray(enExport.note) ? enExport.note.length : 1;
        });
        xmlStream.on('tag:note', (note) => {
            process_node_1.processNode(note);
            // eslint-disable-next-line no-plusplus
            ++noteNumber;
            console.log(`Notes processed: ${noteNumber}`);
        });
        xmlStream.on('end', () => {
            const success = noteNumber - failed;
            console.log(`Conversion finished: ${success} succeeded, ${totalNotes - success} failed.`);
            return resolve();
        });
        xmlStream.on('error', logAndReject);
        stream.on('error', logAndReject);
        /*
         * xml.preserve('en-export', true);
         * xml.collect('note');
         * xml.on('endElement: note', (item: any) => {
         * let np = new NodeProcessor();
         * np.processNode(item);
         * np = undefined;
         *
         * console.log('note');
         * });
         */
    });
};
exports.dropTheRope = async (options) => {
    setOptions(options);
    /*
     * not needed
     * utils.setPaths();
     */
    try {
        await pWriteFile('./test2.enex', testDoc);
        console.log('after await');
        await exports.parseStream(options);
    }
    catch (error) {
        console.log(error);
    }
};
// tslint:enable:no-console
//# sourceMappingURL=yarle.js.map