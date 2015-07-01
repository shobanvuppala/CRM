using Microsoft.Xrm.Sdk;
using System;
using System.Collections.Generic;
using System.Linq;
using System.ServiceModel;
using System.Text;
using System.Threading.Tasks;

namespace TEST06302015.Plugins.PluginCode
{
    public class AccountCreateFollowUp
    {
        /// <summary>
        /// Code to create account task for new accounts
        /// </summary>
        /// <param name="service">crm service</param>
        /// <param name="accountEntity">entity of the newly created account</param>
        public void CreateAccountTask(IOrganizationService service, Entity accountEntity)
        {
            try
            {

                //create new task for account set in 2 weeks in the future
                Microsoft.Xrm.Sdk.Entity contactAccountTask = new Entity("task");
                contactAccountTask["subject"] = "Check new account is happy";
                contactAccountTask["description"] =
                "Make contact with new customer. See if they are happy with service and resolve any issues.";
                contactAccountTask["scheduledstart"] = DateTime.Now.AddDays(14);
                contactAccountTask["scheduledend"] = DateTime.Now.AddDays(14);
                Microsoft.Xrm.Sdk.EntityReference entRef = new EntityReference("account", accountEntity.Id);
                contactAccountTask["regardingobjectid"] = entRef;

                // Create the task and this should be linked to the new account record
                service.Create(contactAccountTask);

            }

            catch (FaultException ex)
            {
                throw new InvalidPluginExecutionException("An error occurred in the plug-in.", ex);
            }
        }

    }

}
