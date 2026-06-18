create database if not exists job_tracker;

use job_tracker;

create table if not exists applications (
    id int auto_increment primary key,
    company_name varchar(255) not null,
    job_title varchar(255) not null,
    job_type enum("Internship", "Full-time", "Part-time") not null,
    status enum("Applied", "Interviewing", "Offer", "Rejected") not null default "Applied",
    applied_date date not null,
    notes text,
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp on update current_timestamp
)