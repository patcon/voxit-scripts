# Lorem Ipsum Tech Group Meeting - 2026/03/06

alice is migrating here for testing archive scripts: (pls ping her if making edits) https://hackmd.io/loremipsum1234?view

who's here? (9 ppl) alice, bob, carol, dave, eve, frank, grace, hugo, iris

## Work progress on renaming Adipiscing

* Consectetur API server -> adipiscing-api-server
* Consectetur WebComponents -> adipiscing-web-components
* Consectetur WebClient -> adipiscing-web-client
* etc. see https://gitlab.com/adipiscing
* Bob asks: AGPL-3+ compliance lorem code base
* #todo `docker compose up` working by monday (carol)
    * uses submodules. helpful. need to update.
    * will add CI and typescript checks after hackathon
    * will do `npm install` for eventual frontend
    * ++iris for funding
* License requires that there is a link to the exact source code

## One word on Lorem Scalability Study

* What to read...
* worked on by Bob + Carol + Dave + Stefan
* did we miss something? is a Q bob has
    * if anyone has ideas that could be added to study
    * #todo share link to study? (bob)
        * on onedrive
    * #todo Please read chapter 6 - Innovations (all)
* meant to be very skimmable and summarizable. read before arrival.
* #idea can generate summaries for diff amounts of reading time (alice)

## On documenting our work...

* Tech notes == vs. != stakeholder notes (different tool chain / same tool chain)
* Tool for collaboratively taking notes
* Storing notes, accessing notes
* Who is responsible?
    * we are not hosting anything. bob offered
    * can collab work on docs with markdown editor. a bit tricky. 2 ppl in one editor means one gets kicked out. not like etherpad
    * nextcloud was more targeted for non-tech users. familiar for gov folks. universal file usage.
    * bob prefers more convenience and smooth process
    * maybe we want to store our stuff where dev is happening
    * alice: my old co-operative does things like this: https://meetings.example.coop/
    * should we have our own little ecosystem for doing stuff?
    * https://example-org.sharepoint.com/sites/loremipsum
    * dave: public to help new developers come in
    * alice: pro Etherpad
    * Bob: nothing locally / technically should be needed, so that everyone could use the toolchain proposed
    * alice: CI driven publishing of notes
    * Dave: stuff (docs) should live where the code is (Etherpad -> GitLab -> staticsite builder / copy to Nextcloud folder)
    * Dave: readable by all, but techie-toolchain
    * Dave: use markdown (something that's readable as plaintext)
    * Carol: see Dave... (same endformat for both technical + non-technical people)
    * Carol: kind of automation
    * dave shared: https://pad.example.net/features   https://pad.example.net/loremipsum?both
    * Bob: for Monday/Tuesday
    * alice: Setup shortlinks for famous work items that we produce #idea
        * #todo set up demo/proposal for hackathon (alice)
        * chosen keywords always resolve to documents/services
    * Hugo: https://github.com/example/lessnmore
    * Frank: public website? Host on adipiscing.org
    * Carol: docs.adipiscing.org (also used to be available for LoremNL / Consecteturapp)
    * Iris: Talk to Linda from COSS ry who is operating the website
    * alice (on chat): maybe use https://hackmd.io/ instead of Etherpad?
    * Eve: important to be ready to revert. Let's not get a finicky tool chain for docwriting into our way - need to walkthrough non-technical (and technical!) people
    * General discussion about how to make documentation tools accessible to technical and non-technical people
    * testing redaction: ███
    * alice: Has been running various projects with documentation tool chains, PoCs are easily at hand
        * prior art: https://github.com/example/civic-scripts
        * prior art: https://github.com/example/worker-scripts
        * made demo: https://github.com/alice/lorem-scripts/
    * Carol: Git-based CMS / Wikis (to see conveniently who changed what) --> Grav CMS
    * Eve: Decap CMS is a Git based CMS - lots of others available
    * alice: hackmd.io -- still has split view
    * Hugo: Free-to-use Etherpad by a Finnish NGO. https://muistio.example.fi/ (backup emergency tool if all else fails?)
    * a redacted paragraph example: █████████████████████████████████████████████████████████████████████████████████████████
* Dave sets up etherpad too
* Are these public meetings with public notes?
        * alice: privacy notes vs. public notes (use strike-through to denote what is private and what not)
    * Eve: as civil servant I can't say things that are too political
    * Iris: maybe post-edit notes having been taken, maybe people think two weeks later that they are not happy about what they said back then and better not have it published
    * Bob: Have a process for 'off the record' comments/discussion
    * Grace: Everybody should have had a chance to have a say in this at least once before we make a decision.
    * bob: maybe we could have standup meetings, and bigger meetings.
        * maybe process can vary.
* Discussion about Lorem vs. Adipiscing
