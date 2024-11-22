# GDFS Design

# Requirements

1. Features: use oauth 2.0, list files, select and upload file, select and download file, select and delete file
2. Unit & integration tests
3. Clear documentation
4. Source in public repo
5. “Documentation” and testing instructions
6. 5-10 min video demo and explaining approach
7. Code should be clean, readable, documented, utilize appropriate design patterns, SOLID principles
8. In README:
    - overview/summary,
    - dev environment setup,
    - running the application,
    - list assumptions,
    - explain design decisions
9. *“Comment where necessary”*

# Feature Overview

The required features are **Authentication/OAuth**, **List files, Upload file, Download file**, **Delete file**.

## Goals

- **Authentication (AUTH)**

    Use OAuth 2.0:

    1. login with google creds
    2. authorize access to Google Drive
- **List files (LIST)**

    List *all files in their Google Drive*. Show filename, type, last modified

- **Upload file (PUT)**

    *Select a local file* and upload it to *a specified folder*

- **Download file (GET)**

    *Select a remote file* and save it *to their local system*

- **Delete file (DELETE)**

    *Select a file* from *the list of files* and delete it.


## Non-goals

These are feature elements which will not be implemented in v1.0 (but maybe later).

- Multiple file selection for PUT, GET, DELETE
- Unlisted README sections (…it could get out of hand and eat up too much time)
- If using a UI, “unnecessary styling” (color scheme, animations, transitions, etc.)
- Upload/download progress bars

## Ambiguities

- AUTH
    - Does not specify if OAuth interactions should be raw HTTP API requests or a hand-off (Google provided UI component which returns the necessary tokens)

- LIST

    *“…list all files in the user’s Google Drive”*

    - Doesn’t explicitly say in a UI component or in a tree structure.
    - Doesn’t say persistent or navigable
    - Does not define: **all files in Drive**, i.e. all files in the root? all files recursively?

- PUT

    *“Select a file from their local system”*

    - does not define: **select** or **file**.
- GET/DELETE

    *“…select a file from the list of files…”*

    - again, **select** and **file** is undefined
    - For GET, *“…to their local system”* doesn’t say a specific directory

# Design Outline

## Assumptions, clarifications, and design decisions

Resolves things that were left out or listed in the [Ambiguities](#ambiguities) section.

1. Given the fact that remote file selection is needed for GET and DELETE, a persistent and navigable file LIST makes the most sense.
2. Because of #1, I think HTML/JavaScript would be the easiest way to implement this.
    - Hierarchies are easy in HTML (and simple UIs in general).
    - There’s already a browser component for local file selection.
    - Making a web app allows me to leverage the provided OAuth UI more easily
3. Directories are not treated as files, i.e. you cannot download, upload, or delete them.
4. For the simplicity of v1, this won't support "resumable" uploads. Therefore, the upload file size is limited to 5 MB.

### UX

* Everything except the login button is disabled until you authenticate and authorize.
* I'm going to use Material-UI because they have a TreeView component already and they look good without much effort

### Implementation

* Using React because I think it's easier to deal with when there are components like the file/directory tree.
  * Also, there might be a component lib that could render a directory tree for me.
* Using TypeScript because type safety prevents a lot of potential bugs at compile time.
* Using Jest because it has React extensions.

