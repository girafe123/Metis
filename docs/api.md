# api

## Folder
```
  {
    'id', 'name', 'createTime', 'updateTime', 'parentId', 'isDelete', 'isPublic'
  }
```

### query folder list
* url: /api/folder
* method: get
* arguments:
  - query string: 
    * isDelete: boolean
* return: List<Folder>

### create folder
* url: /api/folder
* method: post
* arguments:
  - body: 
    * name: string
    * parentId: string
    * isPublic: boolean
* return: Folder

### update folder
* url: /api/folder/{id}
* method: put
* arguments:
  - body: 
    * name: string
    * parentId: string
    * isPublic: boolean
    * isDelete: boolean
* return: Folder

### delete folder
* url: /api/folder/{id}
* method: delete

## Document

```
  {
    'id', 'title', 'updateTime', 'type', 'isPublic', 'isDelete'
  } // DocumentListItem

  {
    'id', 'title', 'updateTime', 'type', 'content', 'isPublic', 'folder'
  } // Document
```


### query document list
* url: /api/document
* method: get
* arguments:
  - query string: 
    * folder: string
    * isDelete: boolean
    * isPublic: boolean
* return: List<DocumentListItem>

### query document
* url: /api/document/{id}
* method: get
* return: List<Document>

### create document
* url: /api/document
* method: post
* arguments:
  - body:
    * title: string
    * type: string
    * content: string
    * isPublic: boolean
    * folder: string
* return: Document

### update document
* url: /api/document/{id}
* method: put
* arguments:
  - body:
    * title: string
    * type: string
    * content: string
    * isPublic: boolean
    * folder: string
* return: Document

### delete document
* url: /api/document/{id}
* method: delete

## Attachment
```
  {
    'id', 'name', 'file'
  }
```

### query attachment list
* url: /api/upload
* method: get
* arguments:
  - query string: 
    * doc: string
* return: List<Attachment>

### create attachment
* url: /api/upload
* method: post
* arguments:
  - body: 
    * document: string
  - form data:
    * attachments: file
* return: Attachment

### delete attachment
* url: /api/upload/id
* method: delete