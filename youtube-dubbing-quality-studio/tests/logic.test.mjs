import test from 'node:test';
import assert from 'node:assert/strict';
import {seedSegments,metrics,srt,normalizeSegments,formatTime} from '../logic.mjs';
test('seed demo is fully pending',()=>{const m=metrics(seedSegments());assert.equal(m.total,7);assert.equal(m.approved,0);assert.ok(m.unresolved>0);});
test('a correction and approval change distinct indicators',()=>{const s=seedSegments();s[2].dub+=' (reviewed)';s[2].status='approved';const m=metrics(s);assert.equal(m.corrected,1);assert.equal(m.approved,1);assert.equal(m.unresolved,m.flagged-1);});
test('SRT exports corrected subtitle text',()=>{const s=seedSegments().slice(0,1);s[0].dub='Corrected line';assert.match(srt(s),/Corrected line/);assert.match(srt(s),/00:00:00,000 --> 00:00:06,000/);});
test('reject malformed import',()=>assert.throws(()=>normalizeSegments([{source:'a',dub:'b',start:4,end:3}])));
test('time format',()=>assert.equal(formatTime(63),'01:03'));
