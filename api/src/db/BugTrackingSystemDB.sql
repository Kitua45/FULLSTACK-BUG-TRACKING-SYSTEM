CREATE TABLE Users (
    userid INT IDENTITY(1,1) PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,

    role_user VARCHAR(50) NOT NULL DEFAULT 'user',

    created_at DATETIME NOT NULL DEFAULT GETDATE(),
    updated_at DATETIME NULL,
    verification_code VARCHAR(10) NULL,
    is_verified BIT NOT NULL DEFAULT 0
);


CREATE TABLE Projects (
    projectid INT IDENTITY(1,1) PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    description TEXT,
    status VARCHAR(20) DEFAULT 'active'
        CHECK (status IN ('active', 'on-hold', 'completed', 'archived')),
    created_by INT NOT NULL,
    created_at DATETIME DEFAULT GETDATE(),
    updated_at DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (created_by) REFERENCES Users(userid)
);

CREATE TABLE UserProject (
    id INT IDENTITY(1,1) PRIMARY KEY,
    projectid INT NOT NULL,
    userid INT NOT NULL,
    role_in_project VARCHAR(20)
        CHECK (role_in_project IN ('lead', 'developer', 'tester')),
    assigned_at DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (projectid) REFERENCES Projects(projectid),
    FOREIGN KEY (userid) REFERENCES Users(userid),
    CONSTRAINT UQ_ProjectMember UNIQUE (projectid, userid)
);

CREATE TABLE Bugs (
    bugid INT IDENTITY(1,1) PRIMARY KEY,
    projectid INT NOT NULL,
    reported_by INT NOT NULL,
    assigned_to INT,
    title VARCHAR(150) NOT NULL,
    description TEXT,
    severity VARCHAR(20)
        CHECK (severity IN ('low', 'medium', 'high', 'critical')),
    status VARCHAR(20)
        CHECK (status IN ('open', 'in_progress', 'resolved', 'closed')),
    created_at DATETIME DEFAULT GETDATE(),
    updated_at DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (projectid) REFERENCES Projects(projectid),
    FOREIGN KEY (reported_by) REFERENCES Users(userid),
    FOREIGN KEY (assigned_to) REFERENCES Users(userid)
);


CREATE TABLE Comments (
    commentid INT IDENTITY(1,1) PRIMARY KEY,
    bugid INT NOT NULL,
    userid INT NOT NULL,
    content TEXT NOT NULL,
    timestamp DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (bugid) REFERENCES Bugs(bugid),
    FOREIGN KEY (userid) REFERENCES Users(userid)
);
SELECT * FROM Users;
