/**
 * This class is generated by jOOQ
 */
package hu.tilos.radio.jooqmodel.tables.pojos;

/**
 * This class is generated by jOOQ.
 */
@javax.annotation.Generated(value    = { "http://www.jooq.org", "3.4.2" },
                            comments = "This class is generated by jOOQ")
@java.lang.SuppressWarnings({ "all", "unchecked", "rawtypes" })
public class MigrationVersions implements java.io.Serializable {

	private static final long serialVersionUID = -183872748;

	private java.lang.String version;

	public MigrationVersions() {}

	public MigrationVersions(
		java.lang.String version
	) {
		this.version = version;
	}

	public java.lang.String getVersion() {
		return this.version;
	}

	public void setVersion(java.lang.String version) {
		this.version = version;
	}
}