import { defineRelations } from 'drizzle-orm/relations'
import { users } from './user-schema'
import { roles } from './role-schema'
import { accounts } from './account-schema'
import { sessions } from './session-schema'
import { directorProfiles } from './director-profile-schema'
import { divisionHeadProfiles } from './division-head-profile-schema'
import { researchLeadProfiles } from './research-lead-profile-schema'
import { researchMembersProfiles } from './research-members-profile-schema'
import { lecturerProfiles } from './lecturer-profile-schema'
import { menteeInternshipProfiles } from './mentee-internship-profile-schema'
import { researchAssistantProfiles } from './research-assistant-profile-schema'
import { facultyPartnerProfiles } from './faculty-partner-profile-schema'
import { prodiPartnerProfiles } from './prodi-partner-profile-schema'
import { academicPartnerProfiles } from './academic-partner-profile-schema'
import { mentoringRelationships } from './mentoring-schema'
import { partners } from './partner-schema'
import { partnershipStatusHistories } from './partnership-status-history-schema'
import { organizations, divisions, referenceData } from './organization-schema'
import { programs } from './program-schema'
import { activities } from './activity-schema'
import { activityTags } from './activity-tag-schema'
import { activityParticipants } from './activity-participant-schema'
import { activityLogs } from './activity-log-schema'
import { documents } from './document-schema'
import { activityDocuments } from './activity-document-schema'
import { partnerDocuments } from './partner-document-schema'
import { reportDocuments } from './report-document-schema'
import { approvals } from './approval-schema'
import { activityApprovals } from './activity-approval-schema'
import { publicationApprovals } from './publication-approval-schema'
import { reportApprovals } from './report-approval-schema'
import {
    newsAnnouncements,
    announcementTargets,
    publications
} from './content-schema'
import { reportTemplates } from './report-template-schema'
import { reports } from './report-schema'
import { reportSnapshots } from './report-snapshot-schema'
import { notificationSettings, notifications } from './notification-schema'
import { auditLogs } from './audit-schema'

const schema = {
    users,
    roles,
    accounts,
    sessions,
    directorProfiles,
    divisionHeadProfiles,
    researchLeadProfiles,
    researchMembersProfiles,
    lecturerProfiles,
    menteeInternshipProfiles,
    researchAssistantProfiles,
    facultyPartnerProfiles,
    prodiPartnerProfiles,
    academicPartnerProfiles,
    mentoringRelationships,
    partners,
    partnershipStatusHistories,
    organizations,
    divisions,
    referenceData,
    programs,
    activities,
    activityTags,
    activityParticipants,
    activityLogs,
    documents,
    activityDocuments,
    partnerDocuments,
    reportDocuments,
    approvals,
    activityApprovals,
    publicationApprovals,
    reportApprovals,
    newsAnnouncements,
    announcementTargets,
    publications,
    reportTemplates,
    reports,
    reportSnapshots,
    notificationSettings,
    notifications,
    auditLogs
} as const

export const schemaWithRelations = defineRelations(schema, helpers => ({
    users: {
        role: helpers.one['roles']({
            from: helpers.users.roleId,
            to: helpers.roles.id
        }),
        division: helpers.one['divisions']({
            from: helpers.users.divisionId,
            to: helpers.divisions.id
        }),
        account: helpers.one['accounts']({
            from: helpers.users.id,
            to: helpers.accounts.userId
        }),
        sessions: helpers.many['sessions']({
            from: helpers.users.id,
            to: helpers.sessions.userId
        }),
        directorProfile: helpers.one['directorProfiles']({
            from: helpers.users.id,
            to: helpers.directorProfiles.userId
        }),
        divisionHeadProfile: helpers.one['divisionHeadProfiles']({
            from: helpers.users.id,
            to: helpers.divisionHeadProfiles.userId
        }),
        researchLeadProfile: helpers.one['researchLeadProfiles']({
            from: helpers.users.id,
            to: helpers.researchLeadProfiles.userId
        }),
        researchMembersProfile: helpers.one['researchMembersProfiles']({
            from: helpers.users.id,
            to: helpers.researchMembersProfiles.userId
        }),
        lecturerProfile: helpers.one['lecturerProfiles']({
            from: helpers.users.id,
            to: helpers.lecturerProfiles.userId
        }),
        menteeInternshipProfile: helpers.one['menteeInternshipProfiles']({
            from: helpers.users.id,
            to: helpers.menteeInternshipProfiles.userId
        }),
        researchAssistantProfile: helpers.one['researchAssistantProfiles']({
            from: helpers.users.id,
            to: helpers.researchAssistantProfiles.userId
        }),
        facultyPartnerProfile: helpers.one['facultyPartnerProfiles']({
            from: helpers.users.id,
            to: helpers.facultyPartnerProfiles.userId
        }),
        prodiPartnerProfile: helpers.one['prodiPartnerProfiles']({
            from: helpers.users.id,
            to: helpers.prodiPartnerProfiles.userId
        }),
        academicPartnerProfile: helpers.one['academicPartnerProfiles']({
            from: helpers.users.id,
            to: helpers.academicPartnerProfiles.userId
        }),
        mentoringAsMentor: helpers.many['mentoringRelationships']({
            from: helpers.users.id,
            to: helpers.mentoringRelationships.mentorId
        }),
        mentoringAsMentee: helpers.many['mentoringRelationships']({
            from: helpers.users.id,
            to: helpers.mentoringRelationships.menteeId
        }),
        createdActivities: helpers.many['activities']({
            from: helpers.users.id,
            to: helpers.activities.createdBy
        }),
        activityParticipations: helpers.many['activityParticipants']({
            from: helpers.users.id,
            to: helpers.activityParticipants.userId
        }),
        activityLogs: helpers.many['activityLogs']({
            from: helpers.users.id,
            to: helpers.activityLogs.userId
        }),
        uploadedDocuments: helpers.many['documents']({
            from: helpers.users.id,
            to: helpers.documents.uploadedBy
        }),
        approvals: helpers.many['approvals']({
            from: helpers.users.id,
            to: helpers.approvals.approverId
        }),
        createdAnnouncements: helpers.many['newsAnnouncements']({
            from: helpers.users.id,
            to: helpers.newsAnnouncements.createdBy
        }),
        submittedPublications: helpers.many['publications']({
            from: helpers.users.id,
            to: helpers.publications.submittedBy
        }),
        createdReports: helpers.many['reports']({
            from: helpers.users.id,
            to: helpers.reports.createdBy
        }),
        notifications: helpers.many['notifications']({
            from: helpers.users.id,
            to: helpers.notifications.recipientId
        }),
        auditLogs: helpers.many['auditLogs']({
            from: helpers.users.id,
            to: helpers.auditLogs.actorId
        }),
        partnershipStatusHistories: helpers.many['partnershipStatusHistories']({
            from: helpers.users.id,
            to: helpers.partnershipStatusHistories.changedBy
        })
    },
    roles: {
        users: helpers.many['users']({
            from: helpers.roles.id,
            to: helpers.users.roleId
        }),
        announcementTargets: helpers.many['announcementTargets']({
            from: helpers.roles.id,
            to: helpers.announcementTargets.targetRoleId
        })
    },
    accounts: {
        user: helpers.one['users']({
            from: helpers.accounts.userId,
            to: helpers.users.id
        })
    },
    sessions: {
        user: helpers.one['users']({
            from: helpers.sessions.userId,
            to: helpers.users.id
        })
    },
    directorProfiles: {
        user: helpers.one['users']({
            from: helpers.directorProfiles.userId,
            to: helpers.users.id
        })
    },
    divisionHeadProfiles: {
        user: helpers.one['users']({
            from: helpers.divisionHeadProfiles.userId,
            to: helpers.users.id
        }),
        division: helpers.one['divisions']({
            from: helpers.divisionHeadProfiles.divisionId,
            to: helpers.divisions.id
        })
    },
    researchLeadProfiles: {
        user: helpers.one['users']({
            from: helpers.researchLeadProfiles.userId,
            to: helpers.users.id
        }),
        researchField: helpers.one['referenceData']({
            from: helpers.researchLeadProfiles.researchFieldId,
            to: helpers.referenceData.id
        })
    },
    researchMembersProfiles: {
        user: helpers.one['users']({
            from: helpers.researchMembersProfiles.userId,
            to: helpers.users.id
        }),
        researchField: helpers.one['referenceData']({
            from: helpers.researchMembersProfiles.researchFieldId,
            to: helpers.referenceData.id
        })
    },
    lecturerProfiles: {
        user: helpers.one['users']({
            from: helpers.lecturerProfiles.userId,
            to: helpers.users.id
        })
    },
    menteeInternshipProfiles: {
        user: helpers.one['users']({
            from: helpers.menteeInternshipProfiles.userId,
            to: helpers.users.id
        })
    },
    researchAssistantProfiles: {
        user: helpers.one['users']({
            from: helpers.researchAssistantProfiles.userId,
            to: helpers.users.id
        })
    },
    facultyPartnerProfiles: {
        user: helpers.one['users']({
            from: helpers.facultyPartnerProfiles.userId,
            to: helpers.users.id
        }),
        partner: helpers.one['partners']({
            from: helpers.facultyPartnerProfiles.partnerId,
            to: helpers.partners.id
        })
    },
    prodiPartnerProfiles: {
        user: helpers.one['users']({
            from: helpers.prodiPartnerProfiles.userId,
            to: helpers.users.id
        }),
        partner: helpers.one['partners']({
            from: helpers.prodiPartnerProfiles.partnerId,
            to: helpers.partners.id
        })
    },
    academicPartnerProfiles: {
        user: helpers.one['users']({
            from: helpers.academicPartnerProfiles.userId,
            to: helpers.users.id
        }),
        partner: helpers.one['partners']({
            from: helpers.academicPartnerProfiles.partnerId,
            to: helpers.partners.id
        })
    },
    mentoringRelationships: {
        mentor: helpers.one['users']({
            from: helpers.mentoringRelationships.mentorId,
            to: helpers.users.id
        }),
        mentee: helpers.one['users']({
            from: helpers.mentoringRelationships.menteeId,
            to: helpers.users.id
        })
    },
    organizations: {
        divisions: helpers.many['divisions']({
            from: helpers.organizations.id,
            to: helpers.divisions.organizationId
        })
    },
    divisions: {
        organization: helpers.one['organizations']({
            from: helpers.divisions.organizationId,
            to: helpers.organizations.id
        }),
        users: helpers.many['users']({
            from: helpers.divisions.id,
            to: helpers.users.divisionId
        }),
        divisionHeadProfiles: helpers.many['divisionHeadProfiles']({
            from: helpers.divisions.id,
            to: helpers.divisionHeadProfiles.divisionId
        }),
        programs: helpers.many['programs']({
            from: helpers.divisions.id,
            to: helpers.programs.divisionId
        }),
        activities: helpers.many['activities']({
            from: helpers.divisions.id,
            to: helpers.activities.divisionId
        }),
        newsAnnouncements: helpers.many['newsAnnouncements']({
            from: helpers.divisions.id,
            to: helpers.newsAnnouncements.divisionId
        }),
        announcementTargets: helpers.many['announcementTargets']({
            from: helpers.divisions.id,
            to: helpers.announcementTargets.targetDivisionId
        }),
        reports: helpers.many['reports']({
            from: helpers.divisions.id,
            to: helpers.reports.divisionId
        })
    },
    referenceData: {
        researchLeadProfiles: helpers.many['researchLeadProfiles']({
            from: helpers.referenceData.id,
            to: helpers.researchLeadProfiles.researchFieldId
        }),
        researchMembersProfiles: helpers.many['researchMembersProfiles']({
            from: helpers.referenceData.id,
            to: helpers.researchMembersProfiles.researchFieldId
        }),
        activityTags: helpers.many['activityTags']({
            from: helpers.referenceData.id,
            to: helpers.activityTags.referenceDataId
        })
    },
    partners: {
        statusHistories: helpers.many['partnershipStatusHistories']({
            from: helpers.partners.id,
            to: helpers.partnershipStatusHistories.partnerId
        }),
        facultyPartnerProfiles: helpers.many['facultyPartnerProfiles']({
            from: helpers.partners.id,
            to: helpers.facultyPartnerProfiles.partnerId
        }),
        prodiPartnerProfiles: helpers.many['prodiPartnerProfiles']({
            from: helpers.partners.id,
            to: helpers.prodiPartnerProfiles.partnerId
        }),
        academicPartnerProfiles: helpers.many['academicPartnerProfiles']({
            from: helpers.partners.id,
            to: helpers.academicPartnerProfiles.partnerId
        }),
        partnerDocuments: helpers.many['partnerDocuments']({
            from: helpers.partners.id,
            to: helpers.partnerDocuments.partnerId
        })
    },
    partnerDocuments: {
        partner: helpers.one['partners']({
            from: helpers.partnerDocuments.partnerId,
            to: helpers.partners.id
        }),
        document: helpers.one['documents']({
            from: helpers.partnerDocuments.documentId,
            to: helpers.documents.id
        })
    },
    partnershipStatusHistories: {
        partner: helpers.one['partners']({
            from: helpers.partnershipStatusHistories.partnerId,
            to: helpers.partners.id
        }),
        changedBy: helpers.one['users']({
            from: helpers.partnershipStatusHistories.changedBy,
            to: helpers.users.id
        })
    },
    programs: {
        division: helpers.one['divisions']({
            from: helpers.programs.divisionId,
            to: helpers.divisions.id
        }),
        activities: helpers.many['activities']({
            from: helpers.programs.id,
            to: helpers.activities.programId
        })
    },
    activities: {
        program: helpers.one['programs']({
            from: helpers.activities.programId,
            to: helpers.programs.id
        }),
        division: helpers.one['divisions']({
            from: helpers.activities.divisionId,
            to: helpers.divisions.id
        }),
        createdBy: helpers.one['users']({
            from: helpers.activities.createdBy,
            to: helpers.users.id
        }),
        tags: helpers.many['activityTags']({
            from: helpers.activities.id,
            to: helpers.activityTags.activityId
        }),
        participants: helpers.many['activityParticipants']({
            from: helpers.activities.id,
            to: helpers.activityParticipants.activityId
        }),
        logs: helpers.many['activityLogs']({
            from: helpers.activities.id,
            to: helpers.activityLogs.activityId
        }),
        activityDocuments: helpers.many['activityDocuments']({
            from: helpers.activities.id,
            to: helpers.activityDocuments.activityId
        }),
        activityApprovals: helpers.many['activityApprovals']({
            from: helpers.activities.id,
            to: helpers.activityApprovals.activityId
        })
    },
    activityTags: {
        activity: helpers.one['activities']({
            from: helpers.activityTags.activityId,
            to: helpers.activities.id
        }),
        referenceData: helpers.one['referenceData']({
            from: helpers.activityTags.referenceDataId,
            to: helpers.referenceData.id
        })
    },
    activityParticipants: {
        activity: helpers.one['activities']({
            from: helpers.activityParticipants.activityId,
            to: helpers.activities.id
        }),
        user: helpers.one['users']({
            from: helpers.activityParticipants.userId,
            to: helpers.users.id
        })
    },
    activityLogs: {
        activity: helpers.one['activities']({
            from: helpers.activityLogs.activityId,
            to: helpers.activities.id
        }),
        user: helpers.one['users']({
            from: helpers.activityLogs.userId,
            to: helpers.users.id
        })
    },
    activityDocuments: {
        activity: helpers.one['activities']({
            from: helpers.activityDocuments.activityId,
            to: helpers.activities.id
        }),
        document: helpers.one['documents']({
            from: helpers.activityDocuments.documentId,
            to: helpers.documents.id
        })
    },
    activityApprovals: {
        activity: helpers.one['activities']({
            from: helpers.activityApprovals.activityId,
            to: helpers.activities.id
        }),
        approval: helpers.one['approvals']({
            from: helpers.activityApprovals.approvalId,
            to: helpers.approvals.id
        })
    },
    documents: {
        uploadedBy: helpers.one['users']({
            from: helpers.documents.uploadedBy,
            to: helpers.users.id
        }),
        activityDocuments: helpers.many['activityDocuments']({
            from: helpers.documents.id,
            to: helpers.activityDocuments.documentId
        }),
        partnerDocuments: helpers.many['partnerDocuments']({
            from: helpers.documents.id,
            to: helpers.partnerDocuments.documentId
        }),
        reportDocuments: helpers.many['reportDocuments']({
            from: helpers.documents.id,
            to: helpers.reportDocuments.documentId
        })
    },
    approvals: {
        approver: helpers.one['users']({
            from: helpers.approvals.approverId,
            to: helpers.users.id
        }),
        activityApprovals: helpers.many['activityApprovals']({
            from: helpers.approvals.id,
            to: helpers.activityApprovals.approvalId
        }),
        publicationApprovals: helpers.many['publicationApprovals']({
            from: helpers.approvals.id,
            to: helpers.publicationApprovals.approvalId
        }),
        reportApprovals: helpers.many['reportApprovals']({
            from: helpers.approvals.id,
            to: helpers.reportApprovals.approvalId
        })
    },
    newsAnnouncements: {
        division: helpers.one['divisions']({
            from: helpers.newsAnnouncements.divisionId,
            to: helpers.divisions.id
        }),
        createdBy: helpers.one['users']({
            from: helpers.newsAnnouncements.createdBy,
            to: helpers.users.id
        }),
        targets: helpers.many['announcementTargets']({
            from: helpers.newsAnnouncements.id,
            to: helpers.announcementTargets.newsAnnouncementId
        })
    },
    announcementTargets: {
        announcement: helpers.one['newsAnnouncements']({
            from: helpers.announcementTargets.newsAnnouncementId,
            to: helpers.newsAnnouncements.id
        }),
        targetRole: helpers.one['roles']({
            from: helpers.announcementTargets.targetRoleId,
            to: helpers.roles.id
        }),
        targetDivision: helpers.one['divisions']({
            from: helpers.announcementTargets.targetDivisionId,
            to: helpers.divisions.id
        })
    },
    publications: {
        submittedBy: helpers.one['users']({
            from: helpers.publications.submittedBy,
            to: helpers.users.id
        }),
        publicationApprovals: helpers.many['publicationApprovals']({
            from: helpers.publications.id,
            to: helpers.publicationApprovals.publicationId
        })
    },
    publicationApprovals: {
        publication: helpers.one['publications']({
            from: helpers.publicationApprovals.publicationId,
            to: helpers.publications.id
        }),
        approval: helpers.one['approvals']({
            from: helpers.publicationApprovals.approvalId,
            to: helpers.approvals.id
        })
    },
    reportTemplates: {
        createdBy: helpers.one['users']({
            from: helpers.reportTemplates.createdBy,
            to: helpers.users.id
        }),
        reports: helpers.many['reports']({
            from: helpers.reportTemplates.id,
            to: helpers.reports.templateId
        })
    },
    reports: {
        template: helpers.one['reportTemplates']({
            from: helpers.reports.templateId,
            to: helpers.reportTemplates.id
        }),
        division: helpers.one['divisions']({
            from: helpers.reports.divisionId,
            to: helpers.divisions.id
        }),
        createdBy: helpers.one['users']({
            from: helpers.reports.createdBy,
            to: helpers.users.id
        }),
        snapshots: helpers.many['reportSnapshots']({
            from: helpers.reports.id,
            to: helpers.reportSnapshots.reportId
        }),
        reportDocuments: helpers.many['reportDocuments']({
            from: helpers.reports.id,
            to: helpers.reportDocuments.reportId
        }),
        reportApprovals: helpers.many['reportApprovals']({
            from: helpers.reports.id,
            to: helpers.reportApprovals.reportId
        })
    },
    reportDocuments: {
        report: helpers.one['reports']({
            from: helpers.reportDocuments.reportId,
            to: helpers.reports.id
        }),
        document: helpers.one['documents']({
            from: helpers.reportDocuments.documentId,
            to: helpers.documents.id
        })
    },
    reportApprovals: {
        report: helpers.one['reports']({
            from: helpers.reportApprovals.reportId,
            to: helpers.reports.id
        }),
        approval: helpers.one['approvals']({
            from: helpers.reportApprovals.approvalId,
            to: helpers.approvals.id
        })
    },
    reportSnapshots: {
        report: helpers.one['reports']({
            from: helpers.reportSnapshots.reportId,
            to: helpers.reports.id
        })
    },
    notificationSettings: {},
    notifications: {
        recipient: helpers.one['users']({
            from: helpers.notifications.recipientId,
            to: helpers.users.id
        })
    },
    auditLogs: {
        actor: helpers.one['users']({
            from: helpers.auditLogs.actorId,
            to: helpers.users.id
        })
    }
}))
